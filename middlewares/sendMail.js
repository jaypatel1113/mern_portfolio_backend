import { createTransport } from "nodemailer";

export const sendMail = async (name, email, message) => {
    // console.log(process.env.EMAIL);
    const transporter = createTransport({
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

    const mailToMe = {
        from: email,
        to: process.env.EMAIL,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
    };
    const mailToViewer = {
        from: process.env.EMAIL,
        to: email,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Thanks ${name}! For your valuable feedback ✌️</p>`,
    };

    transporter.sendMail(mailToMe, (error) => {
        if (error) {
            res.json(error);
            res.status(400).json({ success: false, message: "email not send" });
        } else {
            res.status(200).json({
                success: true,
                message: "Email sent Succesfully",
            });
        }
    });
    transporter.sendMail(mailToViewer, (error) => {
        if (error) {
            res.json(error);
            res.status(400).json({
                success: false,
                message: "email not send to viewer",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Email sent Succesfully to viewer",
            });
        }
    });
};
