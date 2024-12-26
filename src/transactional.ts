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
    const originalMethod = descriptor.value;

    descriptor.value = wrapInTransaction(originalMethod, options);

    Reflect.getMetadataKeys(originalMethod).forEach((previousMetadataKey) => {
      const previousMetadata = Reflect.getMetadata(
        previousMetadataKey,
        originalMethod,
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
  async function wrapped(this: unknown, ...newArgs: unknown[]): Promise<any> {
    try {
      const context = getNamespace<Record<string, Sequelize>>(
        SEQUELIZE_INSTANCE_NAME_SPACE,
      );
      const sequelizeInstance = context.get(SEQUELIZE_INSTANCE);
      return await sequelizeInstance.transaction(
        {
          isolationLevel: isolationLevelLiteralToEnum[options.isolationLevel],
        },
        async (transaction: sequelize.Transaction) => {
          try {
            return await func.apply(this, newArgs);
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
