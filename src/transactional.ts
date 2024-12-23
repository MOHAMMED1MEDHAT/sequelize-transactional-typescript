import { getNamespace } from 'cls-hooked';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_INSTANCE, SEQUELIZE_INSTANCE_NAME_SPACE } from './common';
import {
  isolationLevelLiteralToEnum,
  TransactionalOptions,
} from './isolation-level';

//TODO: Add support for transactions propagation
export function Transactional(
  options: TransactionalOptions = {
    isolationLevel: 'READ COMMITTED',
  },
): MethodDecorator {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = wrapInTransaction(descriptor.value, options);

    Reflect.getMetadataKeys(descriptor.value).forEach((previousMetadataKey) => {
      const previousMetadata = Reflect.getMetadata(
        previousMetadataKey,
        descriptor.value,
      );
      Reflect.defineMetadata(
        previousMetadataKey,
        previousMetadata,
        descriptor.value,
      );
    });

    Object.defineProperty(descriptor.value, 'name', {
      value: descriptor.value.name,
      writable: false,
    });
  };
}

function wrapInTransaction<
  Func extends (this: any, ...args: any[]) => ReturnType<Func>,
>(
  func: Func,
  options: TransactionalOptions = {
    isolationLevel: 'READ COMMITTED',
  },
): Func {
  async function wrapped(this: unknown, ...newArgs: unknown[]): Promise<void> {
    try {
      const context = getNamespace<Record<string, Sequelize>>(
        SEQUELIZE_INSTANCE_NAME_SPACE,
      );
      const sequelizeInstance = context.get(SEQUELIZE_INSTANCE);
      await sequelizeInstance.transaction(
        {
          isolationLevel: isolationLevelLiteralToEnum[options.isolationLevel],
        },
        async (transaction: sequelize.Transaction) => {
          try {
            const result = await func.apply(this, ...newArgs);
            return result;
          } catch (error) {
            await transaction.rollback();
            throw error;
          }
        },
      );
    } catch (error) {
      throw error;
    }
  }
  return wrapped as Func;
}
