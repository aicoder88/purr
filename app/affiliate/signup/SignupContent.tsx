"use client";

import { useState, useRef } from 'react';
import { Container } from '@/components/ui/container';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SignupContent() {
    const t = useTranslations();
    const successMessageRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        audience: '',
        trafficSource: '',
        monthlyVisitors: '',
        experience: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/affiliate/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                website: '',
                audience: '',
                trafficSource: '',
                monthlyVisitors: '',
                experience: '',
                message: '',
            });

            // Scroll to success message
            setTimeout(() => {
                successMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');

            // Scroll to error message
            setTimeout(() => {
                successMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle missing translations gracefully - show error page instead of crashing
    if (!t('affiliate')) {
        return (
            <div className="min-h-screen bg-white bg-gray-950 flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-900 text-gray-50 mb-4">
                        Page Temporarily Unavailable
                    </h2>
                    <p className="text-gray-700 text-gray-300 mb-6">
                        We&apos;re experiencing technical difficulties. Please try refreshing the page or come back later.
                    </p>
                    <Link href="/">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 bg-blue-600 hover:bg-blue-700 text-white text-white rounded-lg font-semibold transition-colors">
                            Return Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#2e90fa] to-[#1e5dd6] from-[#2e90fa] to-[#1e5dd6] py-16 md:py-24">
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-gray-100 mb-4">
                            Apply to Join Our Affiliate Program
                        </h1>
                        <p className="text-xl text-blue-100 text-blue-50 mb-6 font-light">
                            Start at 20% and grow up to 30% commission as you make more sales
                        </p>
                        <div className="flex items-center justify-center gap-6 text-white text-gray-100">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm">Free to join</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm">No monthly fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm">Quick approval</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Application Form */}
            <section className="py-16 md:py-24 bg-white bg-gray-950">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        {submitStatus === 'success' && (
                            <div ref={successMessageRef} className="mb-8 p-6 bg-green-50 bg-green-900/20 border border-green-200 border-green-800 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-heading text-lg font-semibold text-green-900 text-green-100 mb-2">
                                            Application Submitted Successfully!
                                        </h3>
                                        <p className="text-green-700 text-green-200 mb-4">
                                            Thank you for applying to our affiliate program. We&apos;ll review your application and get back to you within 1-2 business days.
                                        </p>
                                        <Link href="/affiliate/">
                                            <button className="inline-flex items-center px-4 py-2 bg-green-600 bg-green-700 hover:bg-green-700 hover:bg-green-600 text-white text-gray-100 rounded-lg text-sm font-semibold transition-colors">
                                                Back to Affiliate Info
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div ref={successMessageRef} className="mb-8 p-6 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-6 h-6 text-red-600 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-heading text-lg font-semibold text-red-900 text-red-100 mb-2">
                                            Submission Failed
                                        </h3>
                                        <p className="text-red-700 text-red-200">
                                            {errorMessage || 'There was an error submitting your application. Please try again.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white bg-gray-900 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-gray-100 border-gray-800 p-8">
                                <h2 className="font-heading text-2xl font-bold text-gray-900 text-gray-50 mb-6">
                                    Your Information
                                </h2>

                                {/* Name */}
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Website */}
                                <div className="mb-6">
                                    <label htmlFor="website" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Website/Social Media URL
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                {/* Audience */}
                                <div className="mb-6">
                                    <label htmlFor="audience" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Describe Your Audience *
                                    </label>
                                    <input
                                        type="text"
                                        id="audience"
                                        name="audience"
                                        required
                                        value={formData.audience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                        placeholder="Cat owners, pet bloggers, etc."
                                    />
                                </div>

                                {/* Traffic Source */}
                                <div className="mb-6">
                                    <label htmlFor="trafficSource" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Primary Traffic Source *
                                    </label>
                                    <select
                                        id="trafficSource"
                                        name="trafficSource"
                                        required
                                        value={formData.trafficSource}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a source...</option>
                                        <option value="blog">Blog/Website</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="tiktok">TikTok</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="email">Email Newsletter</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Monthly Visitors */}
                                <div className="mb-6">
                                    <label htmlFor="monthlyVisitors" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Estimated Monthly Visitors/Followers *
                                    </label>
                                    <select
                                        id="monthlyVisitors"
                                        name="monthlyVisitors"
                                        required
                                        value={formData.monthlyVisitors}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                    >
                                        <option value="">Select a range...</option>
                                        <option value="0-1000">0 - 1,000</option>
                                        <option value="1000-5000">1,000 - 5,000</option>
                                        <option value="5000-10000">5,000 - 10,000</option>
                                        <option value="10000-50000">10,000 - 50,000</option>
                                        <option value="50000+">50,000+</option>
                                    </select>
                                </div>

                                {/* Experience */}
                                <div className="mb-6">
                                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Affiliate Marketing Experience *
                                    </label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        required
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all"
                                    >
                                        <option value="">Select your experience...</option>
                                        <option value="beginner">Beginner (0-1 year)</option>
                                        <option value="intermediate">Intermediate (1-3 years)</option>
                                        <option value="advanced">Advanced (3+ years)</option>
                                        <option value="none">No experience</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 text-gray-100 mb-2">
                                        Why do you want to join our affiliate program?
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white bg-gray-800 border border-gray-300 border-gray-700 rounded-lg text-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2e90fa] focus:ring-[#2e90fa] focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us about your promotional plans and why Purrify is a good fit for your audience..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-8 py-4 bg-[#2e90fa] hover:bg-[#1e5dd6] disabled:bg-gray-400 disabled:bg-gray-600 text-white text-gray-100 text-lg font-semibold rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1),0_0_0_1px_#1E5DD6] hover:shadow-[0_4px_12px_rgba(46,144,250,0.4)] transition-all duration-200 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                                    </button>
                                    <Link href="/affiliate/">
                                        <button
                                            type="button"
                                            className="text-gray-600 text-gray-400 hover:text-gray-900 hover:text-gray-100 font-semibold transition-colors"
                                        >
                                            Back
                                        </button>
                                    </Link>
                                </div>

                                <p className="mt-6 text-sm text-gray-500 text-gray-400">
                                    * Required fields. By submitting this form, you agree to our affiliate program terms and conditions.
                                </p>
                            </div>
                        </form>
                    </div>
                </Container>
            </section>

            {/* Benefits Reminder */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white from-gray-900 to-gray-950">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-heading text-3xl font-bold text-gray-900 text-gray-50 text-center mb-12">
                            What You&apos;ll Get as an Affiliate
                        </h2>

                        {/* Tiered Commission Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-gray-200 border-gray-800 text-center">
                                <div className="text-3xl font-bold text-gray-600 text-gray-400 mb-2">20%</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Starter Tier</div>
                                <p className="text-xs text-gray-600 text-gray-400">Start earning immediately</p>
                            </div>
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-blue-200 border-blue-800 text-center">
                                <div className="text-3xl font-bold text-blue-600 text-blue-400 mb-2">25%</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Active Tier</div>
                                <p className="text-xs text-gray-600 text-gray-400">After 3 cleared sales</p>
                            </div>
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-purple-200 border-purple-800 text-center relative overflow-hidden">
                                <div className="absolute top-2 right-2 bg-purple-600 bg-purple-600 text-white text-white text-xs font-bold px-2 py-0.5 rounded">
                                    TOP
                                </div>
                                <div className="text-3xl font-bold text-purple-600 text-purple-400 mb-2">30%</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Partner Tier</div>
                                <p className="text-xs text-gray-600 text-gray-400">5+ sales/mo for 2 months</p>
                            </div>
                        </div>

                        {/* Other Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-gray-200 border-gray-800 text-center">
                                <div className="text-4xl font-bold text-[#2e90fa] text-[#2e90fa] mb-2">90</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Day Cookie</div>
                                <p className="text-xs text-gray-600 text-gray-400">Long attribution window</p>
                            </div>
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-green-200 border-green-800 text-center">
                                <div className="text-4xl font-bold text-green-600 text-green-400 mb-2">$49</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Monthly Reward</div>
                                <p className="text-xs text-gray-600 text-gray-400">Free product for 3+ sales/mo</p>
                            </div>
                            <div className="bg-white bg-gray-900 p-6 rounded-xl border border-gray-200 border-gray-800 text-center">
                                <div className="text-4xl font-bold text-[#2e90fa] text-[#2e90fa] mb-2">24/7</div>
                                <div className="text-sm font-semibold text-gray-900 text-gray-100 mb-2">Dashboard Access</div>
                                <p className="text-xs text-gray-600 text-gray-400">Track your earnings anytime</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
