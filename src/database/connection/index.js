import { Sequelize } from "sequelize";
import config from "../../config";

const { host, port, database, user, password } = config.postgres;

export const postgresConnection = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: "postgres",
});

export default postgresConnection;
