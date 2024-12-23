import { Model } from 'sequelize-typescript';
import { BuildOptions } from 'sequelize/types';
export interface MyModel extends Model {
}
export type MyModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MyModel;
};
export declare function buildRepository(Model: MyModelStatic): any;
