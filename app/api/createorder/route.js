import Razorpay from 'razorpay';

export const POST = async (req) => {
    const { planId } = await req.json();

    const planIds = {
        beginner: process.env.NEXT_PUBLIC_RAZORPAY_BEGINNER_PLAN_ID,
        pro: process.env.NEXT_PUBLIC_RAZORPAY_PRO_PLAN_ID,
    };

    const plan = planIds[planId];

    if (!plan) {
        return new Response(JSON.stringify({ error: 'Invalid plan ID' }), { status: 400 });
    }

    try {
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        });

        const subscriptionOptions = {
            plan_id: plan,
            customer_notify: 1,
            total_count: 12, 
        };

        const subscription = await razorpay.subscriptions.create(subscriptionOptions);

        return new Response(JSON.stringify({ id: subscription.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating Razorpay subscription:', error);
        return new Response(JSON.stringify({ error: 'Error creating subscription' }), { status: 500 });
    }
};
