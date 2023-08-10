import { DataTypes } from "sequelize";
import postgresConnection from "../connection";
import User from "./User";

const Message = postgresConnection.define(
    "Message",
    {
        // Model attributes are defined here
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.VIRTUAL,
            get() {
                return (
                    new Date(this.updatedAt).getTime() -
                    new Date(this.createdAt).getTime()
                );
            },
        },
    },
    {
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

Message.belongsTo(User, {
    foreignKey: "owner_id",
});

export default Message;
