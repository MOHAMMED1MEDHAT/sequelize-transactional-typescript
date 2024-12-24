import { Global, Module } from '@nestjs/common';
import { repositories } from '../models/post.model';
import { SequelizeModule } from './../../../src/common';

@Global()
@Module({
  imports: [SequelizeModule.forRoot({ sync: { force: true } })],
  providers: [...repositories],
  exports: [...repositories, SequelizeModule],
})
export class DatabaseModule {}
