'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';
import { ClientLocationsMap as OriginalClientLocationsMap } from './ClientLocationsMap';

const ClientLocationsMap = dynamic(
    () => import('./ClientLocationsMap').then((mod) => mod.ClientLocationsMap),
    {
        ssr: false,
        loading: () => <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    }
);

export function LazyClientLocationsMap(props: ComponentProps<typeof OriginalClientLocationsMap>) {
    return <ClientLocationsMap {...props} />;
}
