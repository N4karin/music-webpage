import express from 'express';
import { Resend } from 'resend';

const api_key = process.env.RESEND_API_KEY;

const router = express.Router();
const fromEmail = process.env.FROM_EMAIL;
const resend = new Resend(`"${api_key}"`);

// Define the POST route for sending emails
router.post('/', async (req, res) => {
    const { email, subject, message } = req.body; // Extracting values from request body

    try {
        // Send the email using Resend
        const response = await resend.sendEmail({
            from: fromEmail, // Your sender email
            to: ['nakasrj@gmail.com', email], // List of recipients
            subject: `Contact via nakarin.cc: ${subject}`,
            html: `
                <p>From: ${email}</p>
                <p>Thank you for contacting me! Here is a copy of your message:</p>
                <p>${message}</p>
            `, // HTML content of the email
        });

        // Respond with a success message
        res.status(200).json({ status: 'success', message: 'Email sent successfully!', response });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: 'Failed to send email.' });
    }
});

// Export the router
export default router;
