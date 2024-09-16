'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Subscribe = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');

    const planPrices = {
        Beginner: process.env.NEXT_PUBLIC_RAZORPAY_PRICE_ID_BEGINER,
        Pro: process.env.NEXT_PUBLIC_RAZORPAY_PRICE_ID_PRO,
    };

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center"><div className="loader"></div></div>;
    }

    if (!session) {
        router.push('/pages/login');
        return null;
    }

    const handleSubscription = async (planId) => {
        if (!phone) {
            alert('Please enter your mobile number.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/createorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId }),
            });

            const data = await res.json();

            if (!data || !data.id) {
                throw new Error('Failed to create subscription');
            }

            if (!window.Razorpay) {
                const script = document.createElement('script');
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                document.body.appendChild(script);
                script.onload = () => initiateSubscription(data.id, planId);
                script.onerror = () => { throw new Error('Failed to load Razorpay SDK'); };
            } else {
                initiateSubscription(data.id, planId);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to start subscription');
        } finally {
            setLoading(false);
        }
    };

    const initiateSubscription = (subscriptionId, planId) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            subscription_id: subscriptionId,
            name: "NextSubscription",
            description: "Monthly Subscription Payment",
            handler: async function (response) {
                try {
                    await fetch('/api/savesubscription', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            subscriptionId: response.razorpay_subscription_id,
                            planId: planId,
                            status: 'active',
                            email: session.user.email,
                        }),
                    });
                    alert(`Subscription successful: ${response.razorpay_subscription_id}`);
                    router.push('/pages/managesubscription'); // Redirect to Manage Subscription page
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to save subscription details');
                }
            },
            prefill: {
                email: session.user.email,
                contact: phone,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold text-gray-900 text-center">Choose Your Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-600 mb-4 text-center">Select a subscription plan that fits your needs.</p>
                    <p className="text-blue-600 font-semibold text-center mb-6">Please enter your mobile number in order to buy a subscription</p>
                    <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mb-6"
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12 mb-6">
                        {/* BEGINNER Plan */}
                        <Card className="border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <CardContent className="flex flex-col items-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">BEGINNER</h2>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">₹{planPrices.Beginner}/month</h1>
                                <p className="text-base text-gray-600 mb-6 text-center">For individuals starting out.</p>
                                <Button
                                    onClick={() => handleSubscription('beginner')}
                                    disabled={loading}
                                    className="w-full"
                                    variant={loading ? 'secondary' : 'default'}
                                >
                                    {loading ? 'Processing...' : 'Subscribe'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* PRO Plan */}
                        <Card className="border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <CardContent className="flex flex-col items-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">PRO</h2>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">₹{planPrices.Pro}/month</h1>
                                <p className="text-base text-gray-600 mb-6 text-center">For professionals who need more.</p>
                                <Button
                                    onClick={() => handleSubscription('pro')}
                                    disabled={loading}
                                    className="w-full"
                                    variant={loading ? 'secondary' : 'default'}
                                >
                                    {loading ? 'Processing...' : 'Subscribe'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={() => router.push('/pages/profile')}
                        variant="outline"
                        className="w-full lg:w-1/3 py-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        ← Go Back to Profile
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Subscribe;
