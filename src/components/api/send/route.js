import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
    const body = await req.json();
    const { email, subject, message } = body;

    try {
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: ['nakarin@gmail.com', email],
            subject: `Contact via nakarin.cc: ${subject}`,
            react: (
                <>
                    <p>From {email} </p>
                    <p>Thank you for contacting me! Here is a copy of your message!</p>
                    <p>{message}</p>
                </>
            ),
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
    }
}
