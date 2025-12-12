import nodemailer from 'nodemailer'
import { generateSantaAssignmentHTML } from '../templates/emailContent.ts';

let transporter: nodemailer.Transporter | null = null;

const initializeTransporter = () => {
    if (transporter) return transporter; 

    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '2525'),
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

export const sendSantaAssignmentEmail = async (
    recipientEmail: string, 
    recipientName: string, 
    wishList: string
): Promise<void> => {
    
    const templateData = {
        recipientName: recipientName,
        wishList: wishList
    };

    const activeTransporter = initializeTransporter();
    const emailContent = generateSantaAssignmentHTML(templateData);

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: recipientEmail,
        subject: '🎁 Ви стали Таємним Сантою для...',
        html: emailContent, 
    };

    try {
        await activeTransporter?.sendMail(mailOptions);
        console.log(`Email was successfully sent to ${recipientEmail}`);
    } catch (error) {
        console.error(`Issue while sending email to ${recipientEmail}:`, error);
        throw new Error('Issue while email sending.');
    }
};