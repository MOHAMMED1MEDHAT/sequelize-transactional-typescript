import { Optional, Transaction } from 'sequelize/types';

export interface IRepository<T> {
  createOne(input: Optional<T, keyof T>, transaction?: Transaction): Promise<T>;
}
