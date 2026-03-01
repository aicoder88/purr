
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo, useEffect, useState } from "react";

interface RetailerLocation {
    store_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    phone?: string;
    website?: string;
    lat: number;
    lng: number;
}

// Robust SVG-based marker icon using data URI to bypass CSP issues
const blueMarkerSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIuODUgMEM1Ljc0IDAgMCA1Ljc0IDAgMTIuODVjMCA5LjY0IDExLjI5IDI3LjM2IDEyLjg1IDI4LjE1IDEuNTYtLjc5IDEyLjg1LTE4LjUxIDEyLjg1LTI4LjE1QzI1LjcgNS43NCAxOS45NiAwIDEyLjg1IDB6IiBmaWxsPSIjMkE4MUJDIi8+CiAgPGNpcmNsZSBjeD0iMTIuOCIgY3k9IjEyLjgiIHI9IjUiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==`;

const customIcon = new L.Icon({
    iconUrl: blueMarkerSvg,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
});

interface RetailerMapProps {
    height?: number;
}

export default function RetailerMap({ height = 600 }: RetailerMapProps) {
    const [retailerData, setRetailerData] = useState<RetailerLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mapHeight = height;

    useEffect(() => {
        fetch("/data/retailer_locations.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load retailer data");
                return res.json();
            })
            .then((data: RetailerLocation[]) => {
                setRetailerData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filter valid locations
    const locations = useMemo(() => {
        const filtered = retailerData.filter(
            (loc) => Number.isFinite(loc.lat) && Number.isFinite(loc.lng)
        );
        return filtered;
    }, [retailerData]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700" style={{ minHeight: `${mapHeight}px` }}>
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-orange-500 dark:border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Loading locations...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800/40" style={{ minHeight: `${mapHeight}px` }}>
                <p className="text-red-500 font-medium">Error: {error}</p>
            </div>
        );
    }

    // Center on Canada roughly
    const center: [number, number] = [56.1304, -106.3468];

    return (
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 z-0" style={{ height: `${mapHeight}px` }}>
            <MapContainer
                center={center}
                zoom={4}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc, idx) => (
                    <Marker
                        key={`${loc.store_name}-${idx}`}
                        position={[loc.lat, loc.lng]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="p-1 min-w-[200px]">
                                <h3 className="font-bold text-lg mb-1">{loc.store_name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-600 mb-2 font-sans">
                                    {loc.address}<br />
                                    {loc.city}, {loc.province} {loc.postal_code}
                                </p>
                                {loc.phone && (
                                    <p className="text-sm mb-1 font-sans">📞 {loc.phone}</p>
                                )}
                                <div className="flex flex-col gap-2 mt-3">
                                    {loc.website && (
                                        <a
                                            href={loc.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-orange-700 hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors"
                                        >
                                            Visit Website →
                                        </a>
                                    )}
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.address}, ${loc.city}, ${loc.province}, ${loc.postal_code}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
