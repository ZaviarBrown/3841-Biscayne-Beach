import nodemailer from 'nodemailer';
import { env } from '~/env.mjs';

type EmailDetailsType = {
    html: string;
    subject: string;
    replyTo?: string;
    from?: string;
    to?: string;
};

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
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
}: EmailDetailsType) =>
    transporter.sendMail({
        to: to || env.EMAIL_USER, // "contact@3841biscaynebeach.com",
        from: from || env.EMAIL_USER, // 'cheersbeachescrystalbeach@gmail.com',
        replyTo: replyTo || env.EMAIL_USER, // 'cheersbeachescrystalbeach@gmail.com',
        // to: to || "zaviar.brown@gmail.com",
        // from: from || "zaviar.brown@gmail.com",
        // replyTo: replyTo || "zaviar.brown@gmail.com",
        subject,
        html,
    });
