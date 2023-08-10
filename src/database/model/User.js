import { DataTypes } from "sequelize";
import postgresConnection from "../connection";

const User = postgresConnection.define(
    "User",
    {
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

export default User;
