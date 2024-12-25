"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModule = exports.getSequelizeInstance = exports.initializeSequelizeWithTransactionalContext = exports.namespace = exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN = exports.SEQUELIZE_INSTANCE = exports.SEQUELIZE_INSTANCE_NAME_SPACE = void 0;
const cls_hooked_1 = require("cls-hooked");
const sequelize_typescript_1 = require("sequelize-typescript");
const globalClsNsCtx = {};
exports.SEQUELIZE_INSTANCE_NAME_SPACE = '__sequelize___cls_hooked_tx_namespace';
exports.SEQUELIZE_INSTANCE = 'SEQUELIZE_INSTANCE', exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN = 'SEQUELIZE_INSTANCE_NEST_DI_TOKEN';
exports.namespace = (0, cls_hooked_1.getNamespace)(exports.SEQUELIZE_INSTANCE_NAME_SPACE) ||
    (0, cls_hooked_1.createNamespace)(exports.SEQUELIZE_INSTANCE_NAME_SPACE);
const initializeSequelizeWithTransactionalContext = async (config) => {
    sequelize_typescript_1.Sequelize.useCLS(exports.namespace);
    exports.namespace.run(() => {
        exports.namespace.enter(globalClsNsCtx);
        exports.namespace.set(exports.SEQUELIZE_INSTANCE, new sequelize_typescript_1.Sequelize(config));
    });
};
exports.initializeSequelizeWithTransactionalContext = initializeSequelizeWithTransactionalContext;
const getSequelizeInstance = () => {
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
exports.getSequelizeInstance = getSequelizeInstance;
class SequelizeModule {
    static forRoot(options) {
        const SequelizeInstanceNestProvider = {
            provide: exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN,
            useFactory: async () => {
                await (0, exports.getSequelizeInstance)().sync(options?.sync);
                return (0, exports.getSequelizeInstance)();
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
        await (0, exports.getSequelizeInstance)().close();
    }
}
exports.SequelizeModule = SequelizeModule;
//# sourceMappingURL=common.js.map