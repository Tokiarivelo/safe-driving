// -----------------------------------------------------------------------------
// File: src/search/abstract-search.service.ts
// Purpose: generic base class for search services (index, delete, bulk, search)
// -----------------------------------------------------------------------------
import { Inject, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLIENT } from './elastic/elastic.providers';

export abstract class AbstractSearchService {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(@Inject(ELASTIC_CLIENT) protected readonly es: Client) {}

  async indexOne(
    index: string,
    id: string,
    body: any,
    options?: { refresh?: boolean | 'wait_for' },
  ) {
    try {
      await this.es.index({
        index,
        id,
        body,
        refresh: options?.refresh ?? false,
      });
    } catch (err) {
      this.logger.error(`Failed to index doc ${index}/${id}`, err as any);
      throw err;
    }
  }

  async deleteOne(index: string, id: string) {
    try {
      await this.es.delete({ index, id });
    } catch (err: any) {
      if (err.meta?.statusCode === 404) return;
      this.logger.error(`Failed to delete doc ${index}/${id}`, err);
      throw err;
    }
  }

  async bulk(
    index: string,
    actions: Array<{
      action: 'index' | 'update' | 'delete';
      id: string;
      doc?: any;
    }>,
  ) {
    if (!actions || actions.length === 0) return;
    const body: any[] = [];
    for (const a of actions) {
      if (a.action === 'index')
        (body.push({ index: { _index: index, _id: a.id } }),
          body.push(a.doc || {}));
      if (a.action === 'update')
        (body.push({ update: { _index: index, _id: a.id } }),
          body.push({ doc: a.doc }));
      if (a.action === 'delete')
        body.push({ delete: { _index: index, _id: a.id } });
    }

    try {
      const res = await this.es.bulk({ refresh: false, body });
      if (res.errors) this.logger.warn(`Bulk operation finished with errors`);
      return res;
    } catch (err) {
      this.logger.error('Bulk indexing error', err as any);
      throw err;
    }
  }

  async search(index: string, body: any) {
    console.log('body :>> ', JSON.stringify(body));

    try {
      const res = await this.es.search({ index, body });
      return res;
    } catch (err) {
      this.logger.error(`Search error on index ${index}`, err as any);
      throw err;
    }
  }

  async ping() {
    try {
      return await this.es.ping();
    } catch (err) {
      this.logger.error('Elasticsearch ping failed', err as any);
      throw err;
    }
  }
}
