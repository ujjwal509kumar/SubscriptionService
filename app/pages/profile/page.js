'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (!session) {
        router.push('/pages/login');
        return null;
    }

    const handleSubscribe = () => {
        router.push('/pages/subscribe');
    };

    const handleManageSubscription = () => {
        router.push('/pages/managesubscription');
    };

    const handleExploreBlogs = () => {
        router.push('/pages/exploreblogs');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center p-6 sm:p-12">
            <Card className="shadow-xl rounded-lg max-w-3xl w-full overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Side - User Info */}
                    <div className="bg-gray-900 text-white p-8 flex flex-col items-center justify-center space-y-6">
                        <CardHeader className="text-center">
                            <CardTitle className="text-4xl font-bold">Welcome Back!</CardTitle>
                            <p className="mt-2 text-lg">{session.user.name}</p>
                            <p className="text-sm text-gray-400">{session.user.email}</p>
                        </CardHeader>
                        <Button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-full"
                        >
                            Sign Out
                        </Button>
                    </div>

                    {/* Right Side - Account Actions */}
                    <div className="p-8 flex flex-col justify-center space-y-6">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-semibold text-gray-800">Manage Your Account</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-4">
                            <Button
                                onClick={handleSubscribe}
                                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md"
                            >
                                Subscribe
                            </Button>
                            <Button
                                onClick={handleManageSubscription}
                                className="w-full bg-green-500 text-white font-semibold py-3 rounded-md"
                            >
                                Manage Subscription
                            </Button>
                            <Button
                                onClick={handleExploreBlogs}
                                className="w-full bg-purple-500 text-white font-semibold py-3 rounded-md"
                            >
                                Explore Blogs
                            </Button>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    );
}
