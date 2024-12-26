"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModule = exports.initializeSequelizeWithTransactionalContext = exports.namespace = exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN = exports.SEQUELIZE_INSTANCE = exports.SEQUELIZE_INSTANCE_NAME_SPACE = void 0;
const cls_hooked_1 = require("cls-hooked");
const sequelize_typescript_1 = require("sequelize-typescript");
const globalClsNsCtx = {};
exports.SEQUELIZE_INSTANCE_NAME_SPACE = '__sequelize___cls_hooked_tx_namespace';
exports.SEQUELIZE_INSTANCE = 'SEQUELIZE_INSTANCE', exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN = 'SEQUELIZE_INSTANCE_NEST_DI_TOKEN';
exports.namespace = (0, cls_hooked_1.getNamespace)(exports.SEQUELIZE_INSTANCE_NAME_SPACE) ||
    (0, cls_hooked_1.createNamespace)(exports.SEQUELIZE_INSTANCE_NAME_SPACE);
const initializeSequelizeWithTransactionalContext = () => {
    sequelize_typescript_1.Sequelize.useCLS(exports.namespace);
};
exports.initializeSequelizeWithTransactionalContext = initializeSequelizeWithTransactionalContext;
const getSequelizeInstanceCLS = () => {
    const namespace = (0, cls_hooked_1.getNamespace)(exports.SEQUELIZE_INSTANCE_NAME_SPACE);
    if (!namespace) {
        throw new Error('Namespace not initialized');
    }
    const sequelizeInstance = namespace.get(exports.SEQUELIZE_INSTANCE);
    if (!sequelizeInstance) {
        throw new Error('Sequelize Module could not be initialized, please call initializeSequelizeWithTransactionalContext first');
    }
    return sequelizeInstance;
};
const setSequelizeInstanceCLS = (sequelize) => {
    exports.namespace.run(() => {
        exports.namespace.enter(globalClsNsCtx);
        exports.namespace.set(exports.SEQUELIZE_INSTANCE, sequelize);
    });
};
class SequelizeModule {
    static forRoot(options) {
        const SequelizeInstanceNestProvider = {
            provide: exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN,
            useFactory: async () => {
                const sequelize = new sequelize_typescript_1.Sequelize({
                    ...options,
                });
                setSequelizeInstanceCLS(sequelize);
                await getSequelizeInstanceCLS().sync(options?.sync);
                return sequelize;
            },
        };
        return {
            global: true,
            module: SequelizeModule,
            providers: [SequelizeInstanceNestProvider],
            exports: [SequelizeInstanceNestProvider],
        };
    }
    async onModuleDestroy() {
        await getSequelizeInstanceCLS().close();
    }
}
exports.SequelizeModule = SequelizeModule;
//# sourceMappingURL=common.js.map