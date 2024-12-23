import sequelize from 'sequelize';
export type TransactionalOptions = {
    isolationLevel: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
};
export declare const isolationLevelLiteralToEnum: {
    [key in sequelize.Transaction.ISOLATION_LEVELS]: sequelize.Transaction.ISOLATION_LEVELS;
};
