import mongoose from "mongoose";

export const connect = (connectionString) => {
    return mongoose.connect(connectionString);
}

export const disconnect = () => {
    return mongoose.disconnect();
}
