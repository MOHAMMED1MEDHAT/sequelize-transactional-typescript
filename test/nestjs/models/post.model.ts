import { Provider } from '@nestjs/common';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { buildRepository } from '../modules/repository.builder';

@Table
export class Post extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  message: string;
}

export const models = [Post];

export const repositories: Provider[] = models.map((m) => ({
  provide: `${m.name}Repository`,
  useClass: buildRepository(m),
}));
export enum RepositoryTokens {
  PostRepository = 'PostRepository',
}
