'use client';

import dynamic from 'next/dynamic';

const ClientLocationsMap = dynamic(
    () => import('./ClientLocationsMap').then((mod) => mod.ClientLocationsMap),
    {
        ssr: false,
        loading: () => <div className="h-[400px] bg-gray-100 bg-gray-800 animate-pulse rounded-lg" />,
    }
);

interface ClientLocationsMapProps {
    className?: string;
    height?: string;
    showHeader?: boolean;
    headerTitle?: string;
    headerDescription?: string;
}

export function ClientOnlyLocationsMap(props: ClientLocationsMapProps) {
    return <ClientLocationsMap {...props} />;
}
