import { Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'src';
import { Post } from '../models/post.model';
import { IRepository } from '../modules/repository.interface';

@Injectable()
export class AppService {
  constructor(@Inject() readonly repository: IRepository<Post>) {}

  @Transactional()
  async createPost(fails: boolean = false): Promise<Post> {
    return await this.testTransactionIsolated(fails);
  }

  private async testTransactionIsolated(fails: boolean): Promise<Post> {
    const post = await this.repository.createOne({
      message: 'halla walla 1',
    });
    await this.createHalla(fails);
    return post;
  }

  private async createHalla(fails: boolean): Promise<void> {
    await this.repository.createOne({
      message: 'halla walla 2',
    });
    if (fails) throw new Error('error occurred while creating posts');
  }
}
