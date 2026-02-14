
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const CSV_FILE = path.join(process.cwd(), 'western_stores_enriched_FINAL.csv');
const OUTPUT_FILE = path.join(process.cwd(), 'public/data/retailer_locations.json');

// Nominatim API endpoint
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

interface StoreRecord {
    store_name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    phone?: string;
    website?: string;
    lat?: number | null;
    lng?: number | null;
    [key: string]: any;
}

async function geocodeAddress(address: string, city: string, province: string, postalCode: string) {
    const query = `${address}, ${city}, ${province}, ${postalCode}, Canada`;
    const url = `${NOMINATIM_URL}?format=json&q=${encodeURIComponent(query)}&limit=1`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'PurrifyRetailerMap/1.0 (contact@purrify.ca)'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error(`Error geocoding ${query}:`, error);
        return null;
    }
}

async function main() {
    const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
    const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    }) as StoreRecord[];

    console.log(`Found ${records.length} records to geocode.`);

    const geocodedRecords: StoreRecord[] = [];
    const failedRecords: StoreRecord[] = [];

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Check if output file already exists to resume
    let existingData: StoreRecord[] = [];
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
            console.log(`Resuming... Found ${existingData.length} already geocoded records.`);
        } catch (e) {
            console.warn("Could not read existing file, starting fresh.");
        }
    }

    // Create a map of existing addresses to skip
    const existingMap = new Map<string, StoreRecord>();
    existingData.forEach(r => existingMap.set(r.address + r.city, r));

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const key = record.address + record.city;

        if (existingMap.has(key)) {
            const existing = existingMap.get(key)!;
            geocodedRecords.push(existing);
            continue;
        }

        console.log(`[${i + 1}/${records.length}] Geocoding: ${record.store_name} - ${record.city}`);

        // Add a delay to respect API limits (1 req/sec)
        await new Promise(resolve => setTimeout(resolve, 1100));

        const coords = await geocodeAddress(record.address, record.city, record.province, record.postal_code);

        if (coords) {
            const enrichedRecord: StoreRecord = {
                ...record,
                lat: coords.lat,
                lng: coords.lng
            };
            geocodedRecords.push(enrichedRecord);
            // Save progressively
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(geocodedRecords, null, 2));
        } else {
            console.warn(`Failed to geocode: ${record.store_name}`);
            failedRecords.push(record);
            geocodedRecords.push({
                ...record,
                lat: null,
                lng: null
            });
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(geocodedRecords, null, 2));
        }
    }

    console.log('Geocoding complete.');
    console.log(`Successfully geocoded: ${geocodedRecords.filter(r => r.lat).length}`);
    console.log(`Failed: ${failedRecords.length}`);
}

main().catch(console.error);
