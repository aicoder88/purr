
import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = path.join(process.cwd(), 'public/data/retailer_locations.json');
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

interface Store {
    name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    phone: string;
    url: string;
}

const ACTUAL_STORES: Store[] = [
    {
        name: "Pattes et Griffes (Sainte‑Thérèse)",
        address: "190 Boulevard du Curé-Labelle",
        city: "Sainte-Thérèse",
        province: "QC",
        postal_code: "J7E 2X5",
        phone: "1-450-818-1310",
        url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique"
    },
    {
        name: "Chico (Sainte‑Thérèse)",
        address: "95 Boulevard du Curé-Labelle",
        city: "Sainte-Thérèse",
        province: "QC",
        postal_code: "J7E 2Z7",
        phone: "1-450-965-3906",
        url: "https://www.chico.ca/boutique/chico-sainte-therese/"
    },
    {
        name: "Chico (Sainte‑Marthe‑sur‑le‑Lac)",
        address: "2860 B Boulevard des Promenades",
        city: "Sainte-Marthe-sur-le-Lac",
        province: "QC",
        postal_code: "J0N 1P0",
        phone: "1-450-598-2860",
        url: "https://www.chico.ca/boutique/chico-ste-marthe/"
    },
    {
        name: "Animal Shop GIGI",
        address: "356 Boulevard Arthur-Sauvé",
        city: "Saint-Eustache",
        province: "QC",
        postal_code: "J7R 2J3",
        phone: "1-450-598-3444",
        url: "https://www.animaleriegigi.com/"
    },
    {
        name: "Chico (Laval-Est)",
        address: "5405 Boulevard Robert-Bourassa",
        city: "Laval",
        province: "QC",
        postal_code: "H7E 0A4",
        phone: "1-450-239-0354",
        url: "https://www.chico.ca/en/boutique/chico-laval-east/"
    },
    {
        name: "Chico (Laval Ouest)",
        address: "4511 Bd Arthur-Sauvé",
        city: "Laval",
        province: "QC",
        postal_code: "H7R 5P8",
        phone: "1-450-314-2442",
        url: "https://www.chico.ca/boutique/chico-laval-ouest/"
    },
    {
        name: "Pattes et Griffes (Laval)",
        address: "1682 Boulevard Saint-Martin Ouest",
        city: "Laval",
        province: "QC",
        postal_code: "H7S 1M9",
        phone: "1-579-640-1857",
        url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique"
    },
    {
        name: "Pitou Minou & Compagnons (Kirkland)",
        address: "16936 Autoroute Transcanadienne",
        city: "Kirkland",
        province: "QC",
        postal_code: "H9H 0C5",
        phone: "1-514-695-5005",
        url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/"
    },
    {
        name: "Chico (Saint‑Laurent)",
        address: "7001 Boulevard Saint-Laurent",
        city: "Montréal",
        province: "QC",
        postal_code: "H2S 3E3",
        phone: "1-514-657-5813",
        url: "https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/"
    },
    {
        name: "Doghaus",
        address: "5671 Rue Sherbrooke Ouest",
        city: "Montréal",
        province: "QC",
        postal_code: "H4A 1W6",
        phone: "514-483-3555",
        url: "https://www.doghausmtl.com/"
    },
    {
        name: "Kong Animalerie",
        address: "5555 Bd Décarie",
        city: "Montréal",
        province: "QC",
        postal_code: "H3W 3H8",
        phone: "514-662-8373",
        url: "https://www.facebook.com/konganimalerie/"
    },
    {
        name: "Coquette et Finegueule",
        address: "5203 Rue Bannantyne",
        city: "Verdun",
        province: "QC",
        postal_code: "H4H 1E6",
        phone: "514-761-4221",
        url: "https://coquetteetfinegueule.com/"
    },
    {
        name: "Pitou Minou & Compagnons (Verdun)",
        address: "4100 Rue Wellington",
        city: "Verdun",
        province: "QC",
        postal_code: "H4G 1V7",
        phone: "514-732-0555",
        url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/"
    },
    {
        name: "Chico (Plateau Mont‑Royal)",
        address: "2016 Avenue du Mont-Royal E.",
        city: "Montréal",
        province: "QC",
        postal_code: "H2H 1J6",
        phone: "514-521-0201",
        url: "https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/"
    },
    {
        name: "Chico (Hochelaga‑Maisonneuve)",
        address: "8646 Rue Hochelaga",
        city: "Montréal",
        province: "QC",
        postal_code: "H1L 2M4",
        phone: "514-419-9850",
        url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/"
    },
    {
        name: "Chico (Plateau Mont-Royal — alternate)",
        address: "3911 Rue Ontario E.",
        city: "Montréal",
        province: "QC",
        postal_code: "H1W 1S7",
        phone: "514-527-1371",
        url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/"
    },
    {
        name: "Animalerie Mamiwouff Inc",
        address: "2048 Route 112",
        city: "Saint-Césaire",
        province: "QC",
        postal_code: "J0L 1T0",
        phone: "450-469-4560",
        url: "https://www.animaleriemamiwouff.com/"
    },
    {
        name: "Animalerie Lamifidel",
        address: "1295 Avenue du Pont S",
        city: "Alma",
        province: "QC",
        postal_code: "G8B 2V6",
        phone: "418-668-0117",
        url: "https://www.lamifidel.net/"
    },
    {
        name: "Animalerie Petmobile Nathamo",
        address: " Shawinigan",
        city: "Shawinigan",
        province: "QC",
        postal_code: "G0X 1L0",
        phone: "819-695-2329",
        url: ""
    },
    {
        name: "Animalerie Club Wouf Miaou",
        address: "3175 boulevard des Récollets",
        city: "Trois-Rivières",
        province: "QC",
        postal_code: "G9A 6M1",
        phone: "+1 819-376-0973",
        url: "https://woufmiaou.ca/"
    },
    {
        name: "Little Bit Western Feed and Supplies Inc.",
        address: "372 Algonquin Blvd.West",
        city: "Timmins",
        province: "ON",
        postal_code: "P4N 2S2",
        phone: "",
        url: "https://www.littlebitwestern.ca/"
    },
    {
        name: "K&K Pet Foods Dunbar",
        address: "4595 Dunbar St",
        city: "Vancouver",
        province: "BC",
        postal_code: "V6S 2G2",
        phone: "+1 604-224-2513",
        url: "https://www.kandkpetfoods.ca/"
    },
    {
        name: "Viva Pets",
        address: "Edmonton",
        city: "Edmonton",
        province: "AB",
        postal_code: "",
        phone: "780-489-7387",
        url: "https://www.vivapets.ca/"
    },
    {
        name: "Best Cat",
        address: "3455 Fairview St., Unit 15A",
        city: "Burlington",
        province: "ON",
        postal_code: "L7N 2R4",
        phone: "1-905-333-4060",
        url: "https://bestcat.ca/"
    },
    {
        name: "Camlachie Feed",
        address: "3912 Egremont Rd",
        city: "Camlachie",
        province: "Ontario",
        postal_code: "N0N 1E0",
        phone: "519-899-2285",
        url: "https://www.camlachiefeed.ca/"
    }
];

async function geocodeAddress(address: string, city: string, province: string, postalCode: string) {
    const query = `${address}, ${city}, ${province} ${postalCode}, Canada`;
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
    console.log(`Starting geocoding for ${ACTUAL_STORES.length} actual retailers...`);

    const geocodedRecords = [];

    for (let i = 0; i < ACTUAL_STORES.length; i++) {
        const store = ACTUAL_STORES[i];
        console.log(`[${i + 1}/${ACTUAL_STORES.length}] Geocoding: ${store.name}`);

        const coords = await geocodeAddress(store.address, store.city, store.province, store.postal_code);

        geocodedRecords.push({
            store_name: store.name,
            address: store.address,
            city: store.city,
            province: store.province,
            postal_code: store.postal_code,
            phone: store.phone,
            website: store.url,
            lat: coords ? coords.lat : null,
            lng: coords ? coords.lng : null
        });

        // Delay to respect Nominatim usage policy
        await new Promise(resolve => setTimeout(resolve, 1100));
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(geocodedRecords, null, 2));
    console.log(`Geocoding complete. Data saved to ${OUTPUT_FILE}`);
    console.log(`Successfully geocoded: ${geocodedRecords.filter(r => r.lat).length}/${ACTUAL_STORES.length}`);
}

main().catch(console.error);
