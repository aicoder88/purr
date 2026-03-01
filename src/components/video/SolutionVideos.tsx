import { VideoPlayer} from './VideoPlayer';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// How-to video component for solution pages
interface HowToVideoProps {
  title: string;
  description: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    image?: string;
  }>;
  videoSrc: string;
  videoPoster?: string;
  className?: string;
}

export function HowToVideo({
  title,
  description,
  steps,
  videoSrc,
  videoPoster,
  className
}: HowToVideoProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg', className)}>
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Video Player */}
        <div className="order-2 lg:order-1">
          <VideoPlayer
            src={videoSrc}
            poster={videoPoster}
            title={title}
            description={description}
            className="w-full rounded-lg shadow-md"
            muted={false}
          />

          {/* Video Description */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-heading font-semibold text-blue-900 dark:text-blue-200 mb-2">
              📹 What you'll learn:
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Proper application technique</li>
              <li>• Optimal amount to use</li>
              <li>• When to reapply</li>
              <li>• Common mistakes to avoid</li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="order-1 lg:order-2">
          <h3 className="font-heading text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">
            Step-by-Step Guide
          </h3>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.step}
                className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white dark:text-gray-100 rounded-full flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>

                  {step.image && (
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={200}
                      height={120}
                      sizes="200px"
                      className="mt-3 w-full h-24 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Before & After video showcase
interface BeforeAfterVideoProps {
  title: string;
  description: string;
  beforeVideo: {
    src: string;
    poster?: string;
    title: string;
    description: string;
  };
  afterVideo: {
    src: string;
    poster?: string;
    title: string;
    description: string;
  };
  className?: string;
}

export function BeforeAfterVideo({
  title,
  description,
  beforeVideo,
  afterVideo,
  className
}: BeforeAfterVideoProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg', className)}>
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Before Video */}
        <div className="text-center">
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h3 className="font-heading text-xl font-bold text-red-700 dark:text-red-300 mb-2">
              😤 Before Purrify
            </h3>
            <p className="text-red-600 dark:text-red-400 text-sm">
              {beforeVideo.description}
            </p>
          </div>

          <VideoPlayer
            src={beforeVideo.src}
            poster={beforeVideo.poster}
            title={beforeVideo.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* After Video */}
        <div className="text-center">
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-heading text-xl font-bold text-green-700 dark:text-green-300 mb-2">
              ✨ After Purrify
            </h3>
            <p className="text-green-600 dark:text-green-400 text-sm">
              {afterVideo.description}
            </p>
          </div>

          <VideoPlayer
            src={afterVideo.src}
            poster={afterVideo.poster}
            title={afterVideo.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
        <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Amazing Results in Just 24 Hours!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Odor Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24hr</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Maximum Effect</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Natural & Safe</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Customer testimonial video component
interface TestimonialVideoProps {
  customer: {
    name: string;
    location: string;
    cats: number;
    photo?: string;
  };
  testimonial: {
    quote: string;
    rating: number;
  };
  videoSrc: string;
  videoPoster?: string;
  className?: string;
}

export function TestimonialVideo({
  customer,
  testimonial,
  videoSrc,
  videoPoster,
  className
}: TestimonialVideoProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg', className)}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Video */}
        <div>
          <VideoPlayer
            src={videoSrc}
            poster={videoPoster}
            title={`${customer.name}'s Purrify Experience`}
            description={`Real customer testimonial from ${customer.location}`}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Customer Info & Quote */}
        <div>
          <div className="flex items-center mb-6">
            {customer.photo && (
              <Image
                src={customer.photo}
                alt={customer.name}
                width={64}
                height={64}
                sizes="64px"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            )}
            <div>
              <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50">
                {customer.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {customer.location} • {customer.cats} cat{customer.cats > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  'text-2xl',
                  i < testimonial.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                )}
              >
                ⭐
              </span>
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              {testimonial.rating}/5 stars
            </span>
          </div>

          {/* Quote */}
          <blockquote className="text-lg text-gray-700 dark:text-gray-200 italic mb-6">
            "{testimonial.quote}"
          </blockquote>

          {/* Call to Action */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
              Ready to get the same results?
            </p>
            <p className="text-blue-600 dark:text-blue-300 text-sm">
              Try Purrify risk-free with our 30-day satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Science explanation video component
interface ScienceVideoProps {
  title: string;
  description: string;
  videoSrc: string;
  videoPoster?: string;
  keyPoints: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  className?: string;
}

export function ScienceVideo({
  title,
  description,
  videoSrc,
  videoPoster,
  keyPoints,
  className
}: ScienceVideoProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg', className)}>
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <VideoPlayer
            src={videoSrc}
            poster={videoPoster}
            title={title}
            description={description}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Key Scientific Points */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Key Scientific Facts
          </h3>

          {keyPoints.map((point, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{point.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-50 text-sm mb-1">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}