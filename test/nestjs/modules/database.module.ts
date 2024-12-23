import { Global, Module } from '@nestjs/common';
import { SequelizeInstanceNestProvider } from 'src';
import { repositories } from '../models/post.model';

@Global()
@Module({
  providers: [SequelizeInstanceNestProvider, ...repositories],
  exports: [SequelizeInstanceNestProvider, ...repositories],
})
export class DatabaseModule {}
