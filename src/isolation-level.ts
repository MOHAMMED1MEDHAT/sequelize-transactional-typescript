import sequelize from 'sequelize';

export type TransactionalOptions = {
  isolationLevel:
    | 'READ UNCOMMITTED'
    | 'READ COMMITTED'
    | 'REPEATABLE READ'
    | 'SERIALIZABLE';
};

export const isolationLevelLiteralToEnum: {
  [key in sequelize.Transaction.ISOLATION_LEVELS]: sequelize.Transaction.ISOLATION_LEVELS;
} = {
  'READ UNCOMMITTED': sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  'READ COMMITTED': sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  'REPEATABLE READ': sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  SERIALIZABLE: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
};
