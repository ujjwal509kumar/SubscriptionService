import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { subscriptionId, planId, status, email } = await req.json();

        if (!subscriptionId || !planId || !status || !email) {
            // console.error('Missing required fields:', { subscriptionId, planId, status, email });
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            // console.error('User not found with email:', email);
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userId = user.id;

        const subscription = await prisma.subscription.create({
            data: {
                userId: userId,
                subscriptionId: subscriptionId,
                planId: planId,
                status: status,
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            },
        });

        return new Response(JSON.stringify(subscription), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error saving subscription:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause || 'No additional cause available',
        });

        return new Response(JSON.stringify({ error: 'Failed to save subscription details' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req) {
    console.error('GET method not allowed on this route');
    return new Response('Method not allowed', { status: 405 });
}
