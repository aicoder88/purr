"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const t = useTranslations('auth.admin');
  const shared = useTranslations('auth.shared');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin/blog";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("admin-credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(t('errors.invalidCredentials'));
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError(shared('genericError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signIn('google', {
        callbackUrl,
      });
    } catch {
      setError(shared('genericError'));
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">{shared('email')}</Label>
          <Input
            id="admin-email"
            name="email"
            type="email"
            placeholder={shared('emailPlaceholder')}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">{shared('password')}</Label>
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
          {t('signIn')}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {shared('or')}
        </span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

      <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={handleGoogleLogin}>
        {shared('continueWithGoogle')}
      </Button>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <Link href="/forgot-password?portal=admin" className="hover:underline">
          {shared('forgotPassword')}
        </Link>
        <Link href="/affiliate/login" className="hover:underline">
          {t('affiliateLink')}
        </Link>
      </div>
    </div>
  );
}
