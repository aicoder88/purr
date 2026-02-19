'use client';

import dynamic from 'next/dynamic';

const ClientLocationsMap = dynamic(
    () => import('./ClientLocationsMap').then((mod) => mod.ClientLocationsMap),
    {
        ssr: false,
        loading: () => <div className="h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />,
    }
);

export function ClientOnlyLocationsMap(props: any) {
    return <ClientLocationsMap {...props} />;
}
