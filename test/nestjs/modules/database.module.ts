import { Global, Module } from '@nestjs/common';
import { Post, repositories } from '../models/post.model';
import { SequelizeModule } from './../../../src';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      models: [Post],
      logging: (sql) => console.log(sql),
      // logging: false,
      sync: {
        force: true,
      },
    }),
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
