import { DynamicModule, OnModuleDestroy, Provider } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const globalClsNsCtx = {};
export const SEQUELIZE_INSTANCE_NAME_SPACE =
  '__sequelize___cls_hooked_tx_namespace';
export const SEQUELIZE_INSTANCE = 'SEQUELIZE_INSTANCE',
  SEQUELIZE_INSTANCE_NEST_DI_TOKEN = 'SEQUELIZE_INSTANCE_NEST_DI_TOKEN';

export const namespace =
  getNamespace(SEQUELIZE_INSTANCE_NAME_SPACE) ||
  createNamespace<Record<string, Sequelize>>(SEQUELIZE_INSTANCE_NAME_SPACE);

export const initializeSequelizeWithTransactionalContext = async (
  config: SequelizeOptions,
) => {
  Sequelize.useCLS(namespace);

  namespace.run(() => {
    namespace.enter(globalClsNsCtx);
    namespace.set(SEQUELIZE_INSTANCE, new Sequelize(config));
  });
};

export const getSequelizeInstance = (): Sequelize => {
  const namespace = getNamespace<Record<string, Sequelize>>(
    SEQUELIZE_INSTANCE_NAME_SPACE,
  );
  if (!namespace) {
    throw new Error('Namespace not initialized');
  }

  const sequelizeInstance = namespace.get(SEQUELIZE_INSTANCE);
  if (!sequelizeInstance) {
    throw new Error(
      'Sequelize Module could not be initialized, please call initializeSequelizeWithTransactionalContext first',
    );
  }
  return sequelizeInstance;
};

export type SequelizeModuleOptions = { sync: SyncOptions };

export class SequelizeModule implements OnModuleDestroy {
  public static forRoot(): DynamicModule {
    const SequelizeInstanceNestProvider: Provider = {
      provide: SEQUELIZE_INSTANCE_NEST_DI_TOKEN,
      useFactory: async () => {
        return await getSequelizeInstance().sync(
          getSequelizeInstance().options.sync,
        );
      },
    };
    return {
      global: true,
      module: SequelizeModule,
      providers: [SequelizeInstanceNestProvider],
      exports: [SequelizeInstanceNestProvider],
    };
  }

  async onModuleDestroy() {
    await getSequelizeInstance().close();
  }
}
