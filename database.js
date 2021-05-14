// database.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"
        }
    });

const Oscillation = sequelize.define('Oscillation', {
    first_ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    second_ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    percent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alerted_ask_price: {
        type: Sequelize.STRING,
        allowNull: false
    }}, {
    tableName: 'oscillations',
    }
    );

Oscillation.schema('public');

module.exports = {
    sequelize: sequelize,
    Oscillation: Oscillation
};