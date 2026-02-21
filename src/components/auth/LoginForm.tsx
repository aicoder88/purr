
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || "/admin";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>, type: "admin" | "affiliate") => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn(
                type === "admin" ? "credentials" : "affiliate-credentials",
                {
                    email,
                    password,
                    redirect: false,
                    callbackUrl,
                }
            );

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Tabs defaultValue="affiliate" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <TabsContent value="affiliate">
                    <form onSubmit={(e) => handleLogin(e, "affiliate")} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="affiliate-email">Email</Label>
                            <Input
                                id="affiliate-email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="affiliate-password">Password</Label>
                            <Input
                                id="affiliate-password"
                                name="password"
                                type="password"
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In as Affiliate
                        </Button>
                    </form>
                </TabsContent>

                <TabsContent value="admin">
                    <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="admin-email">Email</Label>
                            <Input
                                id="admin-email"
                                name="email"
                                type="email"
                                placeholder="admin@purrify.ca"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin-password">Password</Label>
                            <Input
                                id="admin-password"
                                name="password"
                                type="password"
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In as Admin
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>

            <div className="mt-4 text-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                    Don't have an affiliate account?{" "}
                    <Link href="/affiliate/signup/" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Join now
                    </Link>
                </p>
            </div>
        </div>
    );
}
