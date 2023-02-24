import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

export const app = express();

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));

app.use(cookieParser());
app.use(cors())

import { userRoute } from "./routes/User.js";

app.use("/admin", userRoute);
