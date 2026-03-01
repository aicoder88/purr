"use client";

/**
 * Local Shipping Urgency Component
 * Displays time-sensitive shipping information for location pages
 * Improves conversion by creating urgency and highlighting fast delivery
 */



import { Clock, Package, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LocalShippingUrgencyProps {
  cityName: string;
  provinceName: string;
  provinceCode: string;
}

export function LocalShippingUrgency({
  cityName,
  provinceName,
  provinceCode
}: LocalShippingUrgencyProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [hoursUntilCutoff, setHoursUntilCutoff] = useState<number>(0);

  // Initialize time on client only to avoid hydration mismatch
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now);

    // Calculate hours until 2PM ET cutoff for same-day dispatch
    const cutoffHour = 14; // 2PM ET
    const currentHour = now.getHours();
    const hoursLeft = cutoffHour - currentHour;

    setHoursUntilCutoff(hoursLeft > 0 ? hoursLeft : 0);
  }, []);

  // Determine delivery estimate based on province
  const getDeliveryEstimate = () => {
    // Major cities get 2-3 days, remote areas get 3-5 days
    const majorProvinces = ['ON', 'QC', 'BC', 'AB'];
    return majorProvinces.includes(provinceCode) ? '2-3' : '3-5';
  };

  const deliveryDays = getDeliveryEstimate();

  return (
    <section className="py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600 from-blue-800 to-purple-800">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 text-gray-50 mb-2">
              🚚 Fast Shipping to {cityName}
            </h2>
            <p className="text-lg text-gray-700 text-gray-200">
              Get Purrify delivered to your door in {deliveryDays} business days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Delivery Timeline */}
            <div className="bg-blue-50 bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 border-blue-700">
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 text-blue-600 text-blue-400 mr-2" />
                <h3 className="font-heading font-bold text-gray-900 text-gray-50">Arrives Fast</h3>
              </div>
              <p className="text-gray-700 text-gray-200">
                <span className="text-2xl font-bold text-blue-600 text-blue-400">{deliveryDays}</span> business days to {cityName}
              </p>
            </div>

            {/* Same-Day Dispatch */}
            <div className="bg-orange-50 bg-orange-900/20 rounded-lg p-4 border-2 border-orange-200 border-orange-700">
              <div className="flex items-center mb-3">
                <Clock className="w-6 h-6 text-orange-600 text-orange-400 mr-2" />
                <h3 className="font-heading font-bold text-gray-900 text-gray-50">Order Today</h3>
              </div>
              {currentTime && hoursUntilCutoff > 0 ? (
                <p className="text-gray-700 text-gray-200">
                  Order within <span className="font-bold text-orange-600 text-orange-400">{hoursUntilCutoff}h</span> for same-day dispatch
                </p>
              ) : (
                <p className="text-gray-700 text-gray-200">
                  Order before <span className="font-bold text-orange-600 text-orange-400">2PM ET</span> for same-day dispatch
                </p>
              )}
            </div>

          </div>

          {/* Local Distribution Center */}
          <div className="bg-purple-50 bg-purple-900/20 rounded-lg p-4 mb-6 border border-purple-200 border-purple-700">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-purple-600 text-purple-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 text-gray-200">
                  <span className="font-semibold text-gray-900 text-gray-50">Ships from Ontario:</span> We partner with Canada Post and local carriers to ensure reliable delivery to {cityName} and surrounding areas in {provinceName}.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/trial-size"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Package className="w-5 h-5 mr-2" />
              Order Now for {cityName}
            </Link>
            <Link
              href="/products/"
              className="inline-flex items-center justify-center border-2 border-gray-300 border-gray-600 text-gray-700 text-gray-100 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 hover:bg-gray-800 transition-all"
            >
              View All Sizes
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-200 border-gray-700">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 text-gray-300">
              <div className="flex items-center">
                <span className="text-green-500 text-green-400 mr-1">✓</span>
                Secure checkout
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-green-400 mr-1">✓</span>
                Tracked shipping
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-green-400 mr-1">✓</span>
                Canadian customer service
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-green-400 mr-1">✓</span>
                Satisfaction guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
