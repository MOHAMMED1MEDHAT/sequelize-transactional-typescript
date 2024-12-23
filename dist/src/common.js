"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModule = exports.getSequelizeInstance = exports.initializeSequelizeWithTransactionalContext = exports.namespace = exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN = exports.SEQUELIZE_INSTANCE = exports.SEQUELIZE_INSTANCE_NAME_SPACE = void 0;
const common_1 = require("@nestjs/common");
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
const SequelizeInstanceNestProvider = {
    provide: exports.SEQUELIZE_INSTANCE_NEST_DI_TOKEN,
    useFactory: async () => {
        return (0, exports.getSequelizeInstance)();
    },
};
let SequelizeModule = class SequelizeModule {
    async onModuleDestroy() {
        await (0, exports.getSequelizeInstance)().close();
    }
};
exports.SequelizeModule = SequelizeModule;
exports.SequelizeModule = SequelizeModule = __decorate([
    (0, common_1.Module)({
        providers: [SequelizeInstanceNestProvider],
        exports: [SequelizeInstanceNestProvider],
    })
], SequelizeModule);
//# sourceMappingURL=common.js.map