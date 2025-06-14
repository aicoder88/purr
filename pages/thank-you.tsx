import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { CheckCircle, Share2, Mail, Gift, Loader2, Copy } from 'lucide-react';
import { Twitter, Facebook } from 'lucide-react';
import NextImage from '../components/NextImage';
import Head from 'next/head';
import Link from 'next/link';

const ThankYouPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [friendEmail, setFriendEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!session_id) return;
    // Fetch referral code from backend (mocked for now)
    const fetchReferral = async () => {
      setLoading(true);
      try {
        // Replace with actual API call to fetch referral code by session_id
        // const res = await fetch(`/api/referrals/by-session?session_id=${session_id}`);
        // const data = await res.json();
        // setReferralCode(data.code);
        setReferralCode('ABC123'); // Mocked
      } catch (err) {
        setError('Could not fetch referral code.');
      } finally {
        setLoading(false);
      }
    };
    fetchReferral();
  }, [session_id]);

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.origin + '/?ref=' + referralCode);
    const text = encodeURIComponent('Get a discount on Purrify with my referral code!');
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=Get%20Purrify%20with%20my%20referral%20code!&body=${text}%20${url}`;
    }
    window.open(shareUrl, '_blank');
  };

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically make an API call to your backend
    // For now, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const handleCopy = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      <Head>
        <title>Thank You - Your Order Has Been Received</title>
        <meta name="description" content="Thank you for your order. We appreciate your business and will process your order shortly." />
      </Head>

      <Container>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-8">
            <NextImage
              src="/optimized/thank-you.webp"
              alt="Thank You"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-[#03E46A]">Thank You!</h1>
          <p className="text-xl mb-8">
            Your order has been received and is being processed.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
            <p className="mb-4">
              You will receive an email confirmation shortly with your order details.
              Our team will begin processing your order right away.
            </p>
            <p className="mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#03E46A] hover:bg-[#02C55A]"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20ordered%20from%20Purrify%20and%20I%20can%27t%20wait%20to%20try%20their%20products!%20%23Purrify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#03E46A]"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://purrify.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#03E46A]"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ThankYouPage; 