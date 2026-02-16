'use client';

import dynamic from 'next/dynamic';
import { ComponentProps, useEffect, useState, useRef } from 'react';
import { ClientLocationsMap as OriginalClientLocationsMap } from './ClientLocationsMap';

const ClientLocationsMap = dynamic(
    () => import('./ClientLocationsMap').then((mod) => mod.ClientLocationsMap),
    {
        ssr: false,
        loading: () => <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    }
);

export function LazyClientLocationsMap(props: ComponentProps<typeof OriginalClientLocationsMap>) {
    const [isInViewport, setIsInViewport] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const element = containerRef.current;
        if (!element) {
            setIsInViewport(true);
            return;
        }

        // Use Intersection Observer to only load when component is near viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry && entry.isIntersecting) {
                        setIsInViewport(true);
                        observer.disconnect();
                    }
                },
                {
                    // Start loading when component is 200px below viewport
                    rootMargin: '200px 0px',
                    threshold: 0
                }
            );

            observer.observe(element);
            return () => observer.disconnect();
        } else {
            // Fallback for browsers without IntersectionObserver
            setIsInViewport(true);
        }
    }, []);

    return (
        <div ref={containerRef} className={props.className}>
            {isInViewport ? (
                <ClientLocationsMap {...props} />
            ) : (
                <div 
                    className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" 
                    aria-label="Map loading..."
                />
            )}
        </div>
    );
}
