import { Global, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { BuildOptions } from 'sequelize/types';
import { IRepository } from './repository.interface';

// We need to declare an interface for our model that is basically what our class would be
export interface MyModel extends Model {}

// Need to declare the static model so `findOne` etc. use correct types.
export type MyModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MyModel;
};

export function buildRepository(Model: MyModelStatic): any {
  @Global()
  @Injectable()
  class DatabaseRepositoryBuilder implements IRepository<MyModel> {
    async createOne(input: any, transaction?: Transaction): Promise<MyModel> {
      return await Model.create(input, { ...(transaction && { transaction }) });
    }
  }
  return DatabaseRepositoryBuilder;
}
