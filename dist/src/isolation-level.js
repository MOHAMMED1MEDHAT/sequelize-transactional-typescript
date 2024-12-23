"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isolationLevelLiteralToEnum = void 0;
const sequelize_1 = require("sequelize");
exports.isolationLevelLiteralToEnum = {
    'READ UNCOMMITTED': sequelize_1.default.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    'READ COMMITTED': sequelize_1.default.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    'REPEATABLE READ': sequelize_1.default.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    SERIALIZABLE: sequelize_1.default.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
};
//# sourceMappingURL=isolation-level.js.map