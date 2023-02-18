import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token) {
            return res.status(400).json({ success: false, message: "Login to Access the resources" });
        }

        // verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        // decode variable contain id of user which was sent from login funciton during jwt.signin

        // then find user with that id
        const user = await User.findById(decode._id);

        // then add user to req 
        req.user = user;

        next();

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}