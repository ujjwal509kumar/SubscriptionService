import { PrismaClient } from '@prisma/client';
import Razorpay from 'razorpay';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token) {
            console.log('Authorization token not found');
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const session = await getServerSession({ req });

        if (!session) {
            console.log('Session not found');
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // console.log('Session Data:', session);

        const { subscriptionId, userId } = await req.json();

        if (!subscriptionId || !userId) {
            console.log('Missing required fields in request body:', { subscriptionId, userId });
            return new Response(JSON.stringify({ error: 'Subscription ID and User ID are required' }), { status: 400 });
        }

        // console.log(`Attempting to cancel subscription with ID: ${subscriptionId}`);

        // Find the subscription in your database
        const subscription = await prisma.subscription.findFirst({
            where: { subscriptionId },
        });

        if (!subscription) {
            console.log('Subscription not found:', subscriptionId);
            return new Response(JSON.stringify({ error: 'Subscription not found' }), { status: 404 });
        }

        // console.log('Found Subscription:', subscription);

        // Verify user authorization
        if (subscription.userId !== userId) {
            console.log('User is not authorized to cancel this subscription. User ID:', userId, 'Subscription User ID:', subscription.userId);
            return new Response(JSON.stringify({ error: 'Not authorized to cancel this subscription' }), { status: 403 });
        }

        // Cancel subscription using Razorpay API
        try {
            await razorpay.subscriptions.cancel(subscriptionId);
            console.log('Subscription canceled successfully:', subscriptionId);

            // Update subscription status in your database
            await prisma.subscription.update({
                where: { id: subscription.id },
                data: { status: 'canceled' },
            });

            return new Response(JSON.stringify({ message: 'Subscription canceled successfully' }), { status: 200 });
        } catch (error) {
            console.error('Error canceling subscription with Razorpay:', error);
            return new Response(JSON.stringify({ error: 'Failed to cancel subscription' }), { status: 500 });
        }

    } catch (error) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ error: 'Failed to cancel subscription' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    return new Response('Method not allowed', { status: 405 });
}
