import { Global, Module } from '@nestjs/common';
import { repositories } from '../models/post.model';

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
