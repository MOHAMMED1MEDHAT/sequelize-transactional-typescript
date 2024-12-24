"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = Transactional;
const cls_hooked_1 = require("cls-hooked");
const common_1 = require("./common");
const isolation_level_1 = require("./isolation-level");
function Transactional(options = {
    isolationLevel: 'READ COMMITTED',
}) {
    return (_, __, descriptor) => {
        descriptor.value = wrapInTransaction(descriptor.value, options);
        Reflect.getMetadataKeys(descriptor.value).forEach((previousMetadataKey) => {
            const previousMetadata = Reflect.getMetadata(previousMetadataKey, descriptor.value);
            Reflect.defineMetadata(previousMetadataKey, previousMetadata, descriptor.value);
        });
        Object.defineProperty(descriptor.value, 'name', {
            value: descriptor.value.name,
            writable: false,
        });
    };
}
function wrapInTransaction(func, options = {
    isolationLevel: 'READ COMMITTED',
}) {
    async function wrapped(...newArgs) {
        try {
            const context = (0, cls_hooked_1.getNamespace)(common_1.SEQUELIZE_INSTANCE_NAME_SPACE);
            const sequelizeInstance = context.get(common_1.SEQUELIZE_INSTANCE);
            return await sequelizeInstance.transaction({
                isolationLevel: isolation_level_1.isolationLevelLiteralToEnum[options.isolationLevel],
            }, async (transaction) => {
                try {
                    return await func.apply(this, newArgs);
                }
                catch (error) {
                    await transaction.rollback();
                    throw error;
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    return wrapped;
}
//# sourceMappingURL=transactional.js.map