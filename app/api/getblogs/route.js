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
        const activeSubscriptions = await prisma.subscription.findMany({
            where: {
                user: { email: session.user.email },
                status: 'active'
            }
        });

        if (activeSubscriptions.length === 0) {
            return NextResponse.json({ error: 'No active subscription found' }, { status: 403 });
        }

        const blogs = await prisma.blogs.findMany();

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', {
            message: error.message,
            stack: error.stack,
        });
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
