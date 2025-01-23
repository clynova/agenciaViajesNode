import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config()

// Usa las variables de entorno
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            timestamps: false, // Desactiva timestamps automáticos
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000, // Tiempo de inactividad en ms
        },
    }
);

export { db };
