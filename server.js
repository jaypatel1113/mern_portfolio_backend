import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";

dotenv.config({ path: "./config/config.env" });
connectDatabase();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
    console.log(`server Running on Port: http://localhost:${PORT}`)
);
app.get("/", (req, res) => res.json("server started"));
