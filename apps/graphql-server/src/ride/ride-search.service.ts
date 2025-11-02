// -----------------------------------------------------------------------------
// File: src/drivers/ride-search.service.ts
// Purpose: Ride-specific search service (extends AbstractSearchService)
// -----------------------------------------------------------------------------
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { AbstractSearchService } from 'src/elasticsearch/abstract-search.service';
import { ELASTIC_CLIENT } from 'src/elasticsearch/elastic/elastic.providers';
import { PrismaService } from 'src/prisma-module/prisma.service';
import ridesMapping from '../drivers/mappings/rides.mapping.json';
import {
  RideSearchResponse,
  RideSearchHit,
  RideSource,
} from 'src/dtos/drivers/ride-search.output';

@Injectable()
export class RideSearchService extends AbstractSearchService {
  private readonly index = 'rides';
  protected readonly logger = new Logger(RideSearchService.name);

  constructor(
    @Inject(ELASTIC_CLIENT) es: Client,
    private readonly prisma: PrismaService,
  ) {
    super(es);
  }

  /**
   * Create the rides index with mapping/settings if it does not exist
   */
  async createRidesIndexIfNotExists() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      this.logger.log(`Index '${this.index}' already exists.`);
      return false;
    }
    await this.es.indices.create({
      index: this.index,
      settings: ridesMapping.settings as any,
      mappings: ridesMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' created with custom mapping/settings.`,
    );
    return true;
  }

  /**
   * Recreate the rides index (delete if exists, then create)
   */
  async recreateRidesIndex() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      await this.es.indices.delete({ index: this.index });
      this.logger.log(`Index '${this.index}' deleted.`);
    }
    await this.es.indices.create({
      index: this.index,
      settings: ridesMapping.settings as any,
      mappings: ridesMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' recreated with custom mapping/settings.`,
    );
    return true;
  }

  async createIndexIfNotExists() {
    await this.createRidesIndexIfNotExists();
  }

  /**
   * Recreate index and bulk index all rides
   */
  async recreateAndBulkIndex() {
    await this.recreateRidesIndex();
    await this.waitForIndexReady();
    await this.bulkIndexAllRides({ refresh: 'wait_for' });
  }

  /**
   * Wait for the rides index to be ready
   */
  private async waitForIndexReady(timeout: string = '30s') {
    this.logger.log(`Waiting for index '${this.index}' to be ready...`);
    await this.es.cluster.health({
      index: this.index,
      wait_for_status: 'yellow',
      timeout,
    });
    this.logger.log(`Index '${this.index}' is ready.`);
  }

  /**
   * Index a ride by id
   */
  async indexRide(rideId: string, opts?: { refresh?: boolean | 'wait_for' }) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        Driver: true,
        RideParticipant: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!ride) {
      this.logger.warn(`Ride ${rideId} not found`);
      return;
    }

    const doc = this.buildRideDoc(ride);
    await this.indexOne(this.index, doc.id, doc, { refresh: opts?.refresh });
  }

  /**
   * Search rides
   * @param q Search query
   * @param options Search options including userId for security filtering
   */
  async searchRides(
    q: string | null,
    options?: {
      page?: number;
      size?: number;
      status?: string;
      userId?: string;
    },
  ): Promise<RideSearchResponse> {
    const page = options?.page ?? 0;
    const size = options?.size ?? 20;

    const must: any[] = [];
    const should: any[] = [];

    // SÉCURITÉ: Filtrer uniquement les rides où l'utilisateur est participant ou conducteur
    if (options?.userId) {
      const shouldUserFilter: any[] = [];

      // L'utilisateur est le conducteur
      shouldUserFilter.push({ term: { driverId: options.userId } });

      // L'utilisateur est un participant
      shouldUserFilter.push({
        nested: {
          path: 'participants',
          query: {
            term: { 'participants.userId': options.userId },
          },
        },
      });

      must.push({
        bool: { should: shouldUserFilter, minimum_should_match: 1 },
      });
    }

    // Filter by status if specified
    if (options?.status) {
      must.push({ term: { status: options.status } });
    }

    if (q && q.trim().length > 0) {
      should.push({
        multi_match: {
          query: q,
          fields: [
            'driver.firstName^2',
            'driver.lastName',
            'driver.username',
            'driver.email',
          ],
        },
      });
      should.push({
        nested: {
          path: 'participants',
          score_mode: 'max',
          query: {
            multi_match: {
              query: q,
              fields: [
                'participants.firstName^2',
                'participants.lastName',
                'participants.email',
              ],
            },
          },
        },
      });

      must.push({ bool: { should, minimum_should_match: 1 } });
    }

    const body = {
      from: page * size,
      size,
      query: must.length > 0 ? { bool: { must } } : { match_all: {} },
      sort: [{ createdAt: { order: 'desc' } }],
    };

    const res = await this.search(this.index, body);
    const total =
      typeof res.hits.total === 'number'
        ? res.hits.total
        : (res.hits.total?.value ?? 0);

    const hits: RideSearchHit[] = res.hits.hits.map((hit) => ({
      _index: hit._index,
      _id: hit._id!,
      _score: hit._score ?? 0,
      _source: hit._source as RideSource,
    }));

    return { total, hits };
  }

  private buildRideDoc(ride: any) {
    const driver = ride.Driver
      ? {
          id: ride.Driver.id,
          email: ride.Driver.email ?? null,
          firstName: ride.Driver.firstName ?? null,
          lastName: ride.Driver.lastName ?? null,
          username: ride.Driver.username ?? null,
        }
      : null;

    const participants = (ride.RideParticipant ?? []).map((p: any) => ({
      id: p.id,
      rideId: p.rideId,
      userId: p.userId,
      role: p.role,
      joinedAt: p.joinedAt,
      firstName: p.user?.firstName ?? null,
      lastName: p.user?.lastName ?? null,
      email: p.user?.email ?? null,
    }));

    return {
      id: ride.id,
      driverId: ride.driverId ?? null,
      status: ride.status,
      startedAt: ride.startedAt ?? null,
      finishedAt: ride.finishedAt ?? null,
      createdAt: ride.createdAt,
      driver,
      participants,
    };
  }

  /**
   * Bulk index all rides
   */
  async bulkIndexAllRides(opts?: { refresh?: boolean | 'wait_for' }) {
    this.logger.log('Bulk indexing all rides...');
    const rides = await this.prisma.ride.findMany({
      include: {
        Driver: true,
        RideParticipant: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!rides.length) {
      this.logger.warn('No rides found to index.');
      return;
    }

    const body = rides.flatMap((ride) => {
      const doc = this.buildRideDoc(ride);
      return [{ index: { _index: this.index, _id: doc.id } }, doc];
    });

    const result = await this.es.bulk({ body, refresh: opts?.refresh });
    if (result.errors) {
      this.logger.error('Bulk indexing completed with errors:', result);
    } else {
      this.logger.log(`Bulk indexed ${rides.length} rides.`);
    }
    return result;
  }
}
