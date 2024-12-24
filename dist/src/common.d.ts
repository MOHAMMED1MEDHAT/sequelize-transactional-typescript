import { OnModuleDestroy } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
export declare const SEQUELIZE_INSTANCE_NAME_SPACE = "__sequelize___cls_hooked_tx_namespace";
export declare const SEQUELIZE_INSTANCE = "SEQUELIZE_INSTANCE", SEQUELIZE_INSTANCE_NEST_DI_TOKEN = "SEQUELIZE_INSTANCE_NEST_DI_TOKEN";
export declare const namespace: import("cls-hooked").Namespace<Record<string, any>>;
export declare const initializeSequelizeWithTransactionalContext: (config: SequelizeOptions) => Promise<void>;
export declare const getSequelizeInstance: () => Sequelize;
export declare class SequelizeModule implements OnModuleDestroy {
    onModuleDestroy(): Promise<void>;
}