import postgresConnection from "./connection";
import Message from "./model/Message";
import User from "./model/User";

const syncModels = async () => {
    await postgresConnection.authenticate();
    await User.sync({ alter: true });
    await Message.sync({ alter: true });
};

const dbInit = async () => {
    try {
        console.debug("Connecting to the database...");
        await syncModels();
        console.debug("Connected to the database");
    } catch (error) {
        console.error(`Error: Failed to connect to the database. ${error}`);
        process.exit(1);
    }
};

export default dbInit;
