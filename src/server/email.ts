import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

type EmailDetailsType = {
    html: string;
    subject: string;
    replyTo?: string;
    from?: string;
    to?: string;
};

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async ({
    html,
    subject,
    replyTo,
    from,
    to,
}: EmailDetailsType) => {
    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    
    return await transporter.sendMail({
        to: to || "contact@3841biscaynebeach.com",
        from: from || "contact@3841biscaynebeach.com",
        replyTo: replyTo || "contact@3841biscaynebeach.com",
        // to: to || "zaviar.brown@gmail.com",
        // from: from || "zaviar.brown@gmail.com",
        // replyTo: replyTo || "zaviar.brown@gmail.com",
        subject,
        html,
    });
};

// const nodemailer = require("nodemailer");

// export default async (req, res) => {
//     const { firstName, lastName, email, message } = JSON.parse(req.body);

//     const transporter = nodemailer.createTransport({
//         port: 465,
//         host: "smtp.gmail.com",
//         auth: {
//             user: "myEmail@gmail.com",
//             pass: "password",
//         },
//         secure: true,
//     });

//     await new Promise((resolve, reject) => {
//         // verify connection configuration
//         transporter.verify(function (error, success) {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             } else {
//                 console.log("Server is ready to take our messages");
//                 resolve(success);
//             }
//         });
//     });

//     const mailData = {
//         from: {
//             name: `${firstName} ${lastName}`,
//             address: "myEmail@gmail.com",
//         },
//         replyTo: email,
//         to: "recipient@gmail.com",
//         subject: `form message`,
//         text: message,
//         html: `${message}`,
//     };

//     await new Promise((resolve, reject) => {
//         // send mail
//         transporter.sendMail(mailData, (err, info) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             } else {
//                 console.log(info);
//                 resolve(info);
//             }
//         });
//     });

//     res.status(200).json({ status: "OK" });
// };
