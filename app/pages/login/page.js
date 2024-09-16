"use client";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'; 
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/pages/profile');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex justify-center items-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-md rounded-lg border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Welcome Back!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-center text-sm sm:text-base text-gray-600">
              Please sign in to continue
            </p>
            <Button
              onClick={() => signIn('google', { callbackUrl: '/pages/profile' })}
              className="w-full bg-red-500 text-white font-semibold py-2 sm:py-3 rounded-md"
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
