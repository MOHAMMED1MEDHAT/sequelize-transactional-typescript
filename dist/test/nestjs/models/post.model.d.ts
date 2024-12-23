import { Provider } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
export declare class Post extends Model {
    id: number;
    message: string;
}
export declare const models: (typeof Post)[];
export declare const repositories: Provider[];
export declare enum RepositoryTokens {
    PostRepository = "PostRepository"
}
