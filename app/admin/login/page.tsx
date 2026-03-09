
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Sign in to the Purrify admin dashboard",
};

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="grid min-h-screen w-full lg:grid-cols-[1.2fr_minmax(440px,0.8fr)]">
                <section className="flex items-center border-b border-gray-200 bg-white px-6 py-12 dark:border-gray-800 dark:bg-gray-900 lg:border-b-0 lg:border-r lg:px-12 xl:px-20">
                    <div className="mx-auto w-full max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-500">
                            Purrify Admin
                        </p>
                        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            Full-access control for editorial, operations, and platform review.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Use the admin portal to manage content, inspect platform activity, and handle operational workflows.
                            Authorized personnel only.
                        </p>
                    </div>
                </section>

                <section className="flex items-center px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
                    <div className="mx-auto w-full max-w-xl space-y-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Admin credentials or approved Google access only.
                            </p>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <LoginForm />
                        </Suspense>
                    </div>
                </section>
            </div>
        </div>
    );
}
