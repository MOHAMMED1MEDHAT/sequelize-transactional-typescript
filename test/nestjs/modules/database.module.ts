import { Global, Module } from '@nestjs/common';
import { repositories } from '../models/post.model';
import { SequelizeModule } from './../../../src/common';

@Global()
@Module({
  imports: [SequelizeModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
