import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const session = await getServerSession({ req });

        if (!session || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscriptions = await prisma.subscription.findMany({
            where: { user: { email: session.user.email } },
            orderBy: { startDate: 'desc' },
        });

        return NextResponse.json(subscriptions, { status: 200 });
    } catch (error) {
        console.error('Error fetching subscriptions:', {
            message: error.message,
            stack: error.stack,
        });
        return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
