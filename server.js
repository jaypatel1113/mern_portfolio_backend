require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 8090;

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log(`server Running on Port: http://localhost:${PORT}`));
app.get("/", (req, res) => res.json("server started"));
// console.log(process.env.EMAIL);
// console.log(process.env.PASSWORD);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const { firstName, lastName, email, message, phone } = req.body;
    const name = firstName + lastName;
    const mail = {
        from: email,
        to: process.env.EMAIL,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
    };
    const mail2 = {
        from: process.env.EMAIL,
        to: email,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Thanks ${firstName}! For your valuable feedback ✌️</p>`,
    };
    transporter.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
            res.status(401).json({ status: 401, message: "email not send" });
        } else {
            res.status(201).json({
                status: 201,
                message: "Email sent Succesfully",
            });
        }
    });
    transporter.sendMail(mail2, (error) => {
        if (error) {
            res.json(error);
            res.status(401).json({
                status: 401,
                message: "email not send to viewer",
            });
        } else {
            res.status(200).json({
                status: 201,
                message: "Email sent Succesfully to viewer",
            });
        }
    });
});
