/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('customers', {
    id: 'id', // Shortcut for SERIAL PRIMARY KEY
    first_name: { type: 'varchar(50)', notNull: true },
    last_name: { type: 'varchar(50)', notNull: true },
    origin: { type: 'varchar(100)' },
  });

  pgm.createTable('coffee_products', {
    id: 'id',
    coffee_name: { type: 'varchar(100)', notNull: true },
    origin: { type: 'varchar(100)' },
  });

  pgm.createTable('orders', {
    id: 'id',
    customer_id: {
      type: 'integer',
      references: '"customers"',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: 'integer',
      references: '"coffee_products"',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('orders');
  pgm.dropTable('coffee_products');
  pgm.dropTable('customers');
};
