// src/api/send.js
import { Resend } from 'resend';

const api_key = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;
const resend = new Resend(`'${api_key}'`);

export default async function handler(req, res) {
    console.log('API Key:', api_key);
    console.log('From Email:', fromEmail);

    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        try {
            const response = await resend.sendEmail({
                from: 'nakasrj@gmail.com',
                to: ['nakasrj@gmail.com', email],
                subject: `Contact via nakarin.cc: ${subject}`,
                html: `
                    <p>From: ${email}</p>
                    <p>Thank you for contacting me! Here is a copy of your message:</p>
                    <p>${message}</p>
                `,
            });

            return res.status(200).json({ status: 'success', message: 'Email sent successfully!', response });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to send email.' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}