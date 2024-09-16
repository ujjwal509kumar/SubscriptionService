'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LoadingPlaceholder = () => (
    <div className="min-h-screen flex flex-wrap items-center justify-center gap-6 p-6">
        {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow-md bg-gray-100 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
                </div>
            </div>
        ))}
    </div>
);

const Page = () => {
    const { data: session, status } = useSession();
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            if (status === 'loading') return;

            if (!session) {
                router.push('/pages/login');
                return;
            }

            try {
                const response = await fetch(`/api/getsubscriptions`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const hasActive = data.some(subscription => subscription.status === 'active');

                    if (hasActive) {
                        setHasActiveSubscription(true);
                        fetchBlogs();
                    } else {
                        router.push('/pages/subscribe');
                    }
                } else {
                    console.error('Failed to fetch subscriptions. Status:', response.status);
                    router.push('/pages/subscribe');
                }
            } catch (error) {
                console.error('Failed to fetch subscriptions:', error);
                router.push('/pages/subscribe');
            }
        };

        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/getblogs");
                if (response.ok) {
                    const blogsData = await response.json();
                    setBlogs(blogsData);
                } else {
                    console.error('Failed to fetch blogs. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchSubscriptionStatus();
    }, [session, status, router]);

    if (status === 'loading') {
        return <LoadingPlaceholder />;
    }

    return hasActiveSubscription ? (
        <main>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <ul className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {blogs.map((blog) => (
                        <li key={blog.slug} className="flex flex-col">
                            <Card className="shadow-lg rounded-lg overflow-hidden">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={blog.link}
                                        alt={blog.title}
                                        layout="fill"
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-1">
                                            {blog.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <p className="text-blue-600 mb-2">
                                        {blog.gener ? `${blog.gener}` : 'Genre not available'}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                                        {blog.description ? blog.description.substr(0, 50) : 'Description not available'}...
                                    </p>
                                    <Link href={`blogpost/${blog.slug}`}>
                                        <Button className="mt-4" variant="outline">
                                            Read More
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </main>
    ) : null;
};

export default Page;
