'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Subscriptions = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/pages/login');
            return;
        }

        const fetchSubscriptions = async () => {
            try {
                const res = await fetch('/api/getsubscriptions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.accessToken}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch subscriptions');
                }

                const data = await res.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, [session, status, router]);

    const handleCancelSubscription = async (subscriptionId) => {
        try {
            const res = await fetch('/api/cancelsubscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({
                    subscriptionId,
                    userId: session?.user?.id,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to cancel subscription');
            }

            alert('Subscription cancelled successfully');
            setSubscriptions((prev) => prev.filter((sub) => sub.subscriptionId !== subscriptionId));
        } catch (error) {
            console.error('Failed to cancel subscription:', error);
            alert('Failed to cancel subscription');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Your Subscriptions</h1>

                {loading ? (
                    <Skeleton className="h-8 w-full" />
                ) : subscriptions.length > 0 ? (
                    <div className="space-y-4">
                        {subscriptions.map((subscription) => (
                            <Card key={subscription.subscriptionId} className="border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-medium text-gray-800">{subscription.planId}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">Status: {subscription.status}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className={`mt-4 w-full ${subscription.status === 'canceled' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
                                        disabled={subscription.status === 'canceled'}
                                        onClick={() => {
                                            if (subscription.status !== 'canceled') {
                                                handleCancelSubscription(subscription.subscriptionId);
                                            }
                                        }}
                                    >
                                        {subscription.status === 'canceled' ? 'Cancelled' : 'Cancel Subscription'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">You have no subscriptions.</p>
                )}

                <CardFooter className="mt-8 flex justify-center">
                    <Button
                        onClick={() => router.push('/pages/profile')}
                        variant="outline"
                        className="py-4 px-8 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        ← Go Back to Profile
                    </Button>
                </CardFooter>
            </div>
        </div>
    );
};

export default Subscriptions;
