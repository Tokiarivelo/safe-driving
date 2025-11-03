// -----------------------------------------------------------------------------
// File: src/user/user-search.service.ts
// Purpose: User-specific search service (extends AbstractSearchService)
// -----------------------------------------------------------------------------
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { AbstractSearchService } from 'src/elasticsearch/abstract-search.service';
import { ELASTIC_CLIENT } from 'src/elasticsearch/elastic/elastic.providers';
import { PrismaService } from 'src/prisma-module/prisma.service';
import usersMapping from './mappings/users.mapping.json';
import {
  UserSearchResponse,
  UserSearchHit,
  UserSource,
} from 'src/dtos/user/user-search.output';
import { User } from 'src/dtos/@generated';

@Injectable()
export class UserSearchService extends AbstractSearchService {
  private readonly index = 'users';
  protected readonly logger = new Logger(UserSearchService.name);

  constructor(
    @Inject(ELASTIC_CLIENT) es: Client,
    private readonly prisma: PrismaService,
  ) {
    super(es);
  }

  /**
   * Create the users index with mapping/settings if it does not exist
   */
  async createUsersIndexIfNotExists() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      this.logger.log(`Index '${this.index}' already exists.`);
      return false;
    }
    await this.es.indices.create({
      index: this.index,
      settings: usersMapping.settings as any,
      mappings: usersMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' created with custom mapping/settings.`,
    );
    return true;
  }

  /**
   * Recreate the users index (delete if exists, then create)
   */
  async recreateUsersIndex() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      await this.es.indices.delete({ index: this.index });
      this.logger.log(`Index '${this.index}' deleted.`);
    }
    await this.es.indices.create({
      index: this.index,
      settings: usersMapping.settings as any,
      mappings: usersMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' recreated with custom mapping/settings.`,
    );
    return true;
  }

  async createIndexIfNotExists() {
    await this.createUsersIndexIfNotExists();
  }

  /**
   * Recreate index and bulk index all users
   */
  async recreateAndBulkIndex() {
    await this.recreateUsersIndex();
    await this.waitForIndexReady();
    await this.bulkIndexAllUsers({ refresh: 'wait_for' });
  }

  /**
   * Wait for the users index to be ready
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
   * Index a user by id
   */
  async indexUser(userId: string, opts?: { refresh?: boolean | 'wait_for' }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Role: true,
      },
    });
    if (!user) {
      this.logger.warn(`User ${userId} not found`);
      return;
    }

    const doc = this.buildUserDoc(user);
    await this.indexOne(this.index, doc.id, doc, { refresh: opts?.refresh });
  }

  /**
   * Search users
   */
  async searchUsers(
    q: string | null,
    options?: { page?: number; size?: number },
  ): Promise<UserSearchResponse> {
    const page = options?.page ?? 0;
    const size = options?.size ?? 20;

    const must: any[] = [];
    const should: any[] = [];

    if (q && q.trim().length > 0) {
      should.push({ match: { email: { query: q } } });
      should.push({ match: { firstName: { query: q, boost: 2 } } });
      should.push({ match: { lastName: { query: q, boost: 2 } } });
      should.push({ match: { username: { query: q } } });
      should.push({ match: { phone: { query: q } } });

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

    const hits: UserSearchHit[] = res.hits.hits.map((hit) => ({
      _index: hit._index,
      _id: hit._id!,
      _score: hit._score ?? 0,
      _source: hit._source as UserSource,
    }));

    return { total, hits };
  }

  private buildUserDoc(user: User) {
    const roles = (user.Role ?? []).map((role: any) => ({
      id: role.id,
      name: role.name,
    }));

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName ?? null,
      phone: user.phone ?? null,
      username: user.username ?? null,
      isVerified: user.isVerified ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null,
      status: user.status ?? null,
      driverStatus: user.driverStatus ?? null,
      avatarUrl: user.avatar?.url ?? null,
      roles,
    };
  }

  /**
   * Bulk index all users
   */
  async bulkIndexAllUsers(opts?: { refresh?: boolean | 'wait_for' }) {
    this.logger.log('Bulk indexing all users...');
    const users = await this.prisma.user.findMany({
      include: {
        Role: true,
      },
    });

    if (!users.length) {
      this.logger.warn('No users found to index.');
      return;
    }

    const body = users.flatMap((user) => {
      const doc = this.buildUserDoc(user);
      return [{ index: { _index: this.index, _id: doc.id } }, doc];
    });

    const result = await this.es.bulk({ body, refresh: opts?.refresh });
    if (result.errors) {
      this.logger.error('Bulk indexing completed with errors:', result);
    } else {
      this.logger.log(`Bulk indexed ${users.length} users.`);
    }
    return result;
  }
}
