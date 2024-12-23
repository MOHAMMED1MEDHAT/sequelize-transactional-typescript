import { Post } from '../models/post.model';
import { IRepository } from '../modules/repository.interface';
export declare class AppService {
    private readonly repository;
    constructor(repository: IRepository<Post>);
    createPost(fails?: boolean): Promise<Post>;
    private testTransactionIsolated;
    private createHalla;
}
