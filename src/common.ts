import { DynamicModule, OnModuleDestroy, Provider } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const globalClsNsCtx = {};
export const SEQUELIZE_INSTANCE_NAME_SPACE =
  '__sequelize___cls_hooked_tx_namespace';
export const SEQUELIZE_INSTANCE = 'SEQUELIZE_INSTANCE',
  SEQUELIZE_INSTANCE_NEST_DI_TOKEN = 'SEQUELIZE_INSTANCE_NEST_DI_TOKEN';

export const namespace =
  getNamespace(SEQUELIZE_INSTANCE_NAME_SPACE) ||
  createNamespace<Record<string, Sequelize>>(SEQUELIZE_INSTANCE_NAME_SPACE);

export const initializeSequelizeWithTransactionalContext = () => {
  Sequelize.useCLS(namespace);
};

const getSequelizeInstanceCLS = (): Sequelize => {
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

const setSequelizeInstanceCLS = (sequelize: Sequelize) => {
  namespace.run(() => {
    namespace.enter(globalClsNsCtx);
    namespace.set(SEQUELIZE_INSTANCE, sequelize);
  });
};

export class SequelizeModule implements OnModuleDestroy {
  public static forRoot(options: SequelizeOptions = undefined): DynamicModule {
    const SequelizeInstanceNestProvider: Provider = {
      provide: SEQUELIZE_INSTANCE_NEST_DI_TOKEN,
      useFactory: async () => {
        try {
          if (!options) {
            throw new Error('Sequelize options not provided');
          }
          const sequelize = new Sequelize(options);
          setSequelizeInstanceCLS(sequelize);
          await getSequelizeInstanceCLS().sync(options?.sync);
          return sequelize;
        } catch (e) {
          throw e;
        }
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
    await getSequelizeInstanceCLS().close();
  }
}
