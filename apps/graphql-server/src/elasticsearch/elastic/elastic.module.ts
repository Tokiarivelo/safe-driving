import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTIC_CLIENT, ELASTIC_CONFIG } from './elastic.providers';

export interface ElasticModuleOptions {
  node: string;
  auth?: { username: string; password: string } | null;
  // add other client options you need
}

/**
 * Async options shape (same idea as Nest's forRootAsync)
 */
export interface ElasticModuleAsyncOptions {
  imports?: Array<Type<any> | DynamicModule | any>;
  useFactory: (
    ...args: any[]
  ) => Promise<ElasticModuleOptions> | ElasticModuleOptions;
  inject?: any[];
}

@Module({})
export class ElasticModule {
  /**
   * Synchronous registration (keeps backward compatibility)
   */
  static forRoot(options: ElasticModuleOptions): DynamicModule {
    const configProvider: Provider = {
      provide: ELASTIC_CONFIG,
      useValue: options,
    };

    const clientProvider: Provider = {
      provide: ELASTIC_CLIENT,
      useFactory: (cfg: ElasticModuleOptions) => {
        const client = new Client({
          node: cfg.node,
          auth: cfg.auth ?? undefined,
        });
        return client;
      },
      inject: [ELASTIC_CONFIG],
    };

    return {
      module: ElasticModule,
      global: true, // Rendre le module global
      providers: [configProvider, clientProvider],
      exports: [clientProvider],
    };
  }

  /**
   * Async registration using the familiar Nest pattern:
   *
   * ElasticModule.forRootAsync({
   *   imports: [ConfigModule],
   *   useFactory: (cfg: ConfigService) => ({ node: cfg.get('ELASTICSEARCH_NODE') }),
   *   inject: [ConfigService]
   * })
   */
  static forRootAsync(options: ElasticModuleAsyncOptions): DynamicModule {
    const clientProvider: Provider = {
      provide: ELASTIC_CLIENT,
      useFactory: async (...args: any[]) => {
        // call the user-provided factory
        const cfg = await options.useFactory(...args);
        const node = cfg.node ?? 'http://localhost:9200';
        const auth = cfg.auth ?? undefined;
        return new Client({ node, auth });
      },
      inject: options.inject ?? [],
    };

    return {
      module: ElasticModule,
      global: true, // Rendre le module global
      imports: options.imports ?? [],
      providers: [clientProvider],
      exports: [clientProvider],
    };
  }
}
