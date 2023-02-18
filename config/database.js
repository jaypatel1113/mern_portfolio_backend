import mongoose from "mongoose";

export const connectDatabase = () => {

    // to avoid warnign in console
    mongoose.set("strictQuery", false);

    mongoose
        .connect(process.env.MONGO_URI)
        .then((c) => {
            console.log(`connected to ${c.connection.host}`)
        })
        .catch((e) => {
            console.log(`erroe in connection ${e}`);
        });

};
