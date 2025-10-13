// Comprehensive location data organized by province
// Each province contains an array of cities with their display names and URL slugs

export interface LocationCity {
  name: string;
  slug: string;
}

export interface Province {
  name: string;
  code: string;
  cities: LocationCity[];
}

export const locationsByProvince: Province[] = [
  {
    name: 'Ontario',
    code: 'ON',
    cities: [
      { name: 'Bancroft', slug: 'bancroft' },
      { name: 'Barrie', slug: 'barrie' },
      { name: 'Belleville', slug: 'belleville' },
      { name: 'Brampton', slug: 'brampton' },
      { name: 'Brantford', slug: 'brantford' },
      { name: 'Brockville', slug: 'brockville' },
      { name: 'Burlington', slug: 'burlington' },
      { name: 'Cambridge', slug: 'cambridge' },
      { name: 'Chatham-Kent', slug: 'chatham-kent' },
      { name: 'Cornwall', slug: 'cornwall' },
      { name: 'Elliot Lake', slug: 'elliot-lake' },
      { name: 'Etobicoke', slug: 'etobicoke' },
      { name: 'Fort Erie', slug: 'fort-erie' },
      { name: 'Fort Frances', slug: 'fort-frances' },
      { name: 'Gananoque', slug: 'gananoque' },
      { name: 'Guelph', slug: 'guelph' },
      { name: 'Hamilton', slug: 'hamilton' },
      { name: 'Iroquois Falls', slug: 'iroquois-falls' },
      { name: 'Kapuskasing', slug: 'kapuskasing' },
      { name: 'Kawartha Lakes', slug: 'kawartha-lakes' },
      { name: 'Kenora', slug: 'kenora' },
      { name: 'Kingston', slug: 'kingston' },
      { name: 'Kirkland Lake', slug: 'kirkland-lake' },
      { name: 'Kitchener', slug: 'kitchener' },
      { name: 'Laurentian Hills', slug: 'laurentian-hills' },
      { name: 'London', slug: 'london' },
      { name: 'Markham', slug: 'markham' },
      { name: 'Midland', slug: 'midland' },
      { name: 'Mississauga', slug: 'mississauga' },
      { name: 'Niagara Falls', slug: 'niagara-falls' },
      { name: 'Niagara-on-the-Lake', slug: 'niagara-on-the-lake' },
      { name: 'North Bay', slug: 'north-bay' },
      { name: 'North York', slug: 'north-york' },
      { name: 'Oakville', slug: 'oakville' },
      { name: 'Orillia', slug: 'orillia' },
      { name: 'Oshawa', slug: 'oshawa' },
      { name: 'Ottawa', slug: 'ottawa' },
      { name: 'Parry Sound', slug: 'parry-sound' },
      { name: 'Perth', slug: 'perth' },
      { name: 'Peterborough', slug: 'peterborough' },
      { name: 'Picton', slug: 'picton' },
      { name: 'Port Colborne', slug: 'port-colborne' },
      { name: 'Richmond Hill', slug: 'richmond-hill' },
      { name: 'Saint Catharines', slug: 'saint-catharines' },
      { name: 'Saint Thomas', slug: 'saint-thomas' },
      { name: 'Sarnia-Clearwater', slug: 'sarnia-clearwater' },
      { name: 'Sault Sainte Marie', slug: 'sault-sainte-marie' },
      { name: 'Scarborough', slug: 'scarborough' },
      { name: 'Simcoe', slug: 'simcoe' },
      { name: 'Stratford', slug: 'stratford' },
      { name: 'Sudbury', slug: 'sudbury' },
      { name: 'Temiskaming Shores', slug: 'temiskaming-shores' },
      { name: 'Thorold', slug: 'thorold' },
      { name: 'Thunder Bay', slug: 'thunder-bay' },
      { name: 'Timmins', slug: 'timmins' },
      { name: 'Toronto', slug: 'toronto' },
      { name: 'Trenton', slug: 'trenton' },
      { name: 'Vaughan', slug: 'vaughan' },
      { name: 'Waterloo', slug: 'waterloo' },
      { name: 'Welland', slug: 'welland' },
      { name: 'West Nipissing', slug: 'west-nipissing' },
      { name: 'Windsor', slug: 'windsor' },
      { name: 'Woodstock', slug: 'woodstock' },
      { name: 'York', slug: 'york' }
    ]
  },
  {
    name: 'Quebec',
    code: 'QC',
    cities: [
      { name: 'Gatineau', slug: 'gatineau' },
      { name: 'Laval', slug: 'laval' },
      { name: 'Longueuil', slug: 'longueuil' },
      { name: 'Montreal', slug: 'montreal' },
      { name: 'Moose Factory', slug: 'moose-factory' },
      { name: 'Moosonee', slug: 'moosonee' },
      { name: 'Quebec City', slug: 'quebec-city' },
      { name: 'Rimouski', slug: 'rimouski' },
      { name: 'Rouyn-Noranda', slug: 'rouyn-noranda' },
      { name: 'Saguenay', slug: 'saguenay' },
      { name: 'Saint-Eustache', slug: 'saint-eustache' },
      { name: 'Saint-Hubert', slug: 'saint-hubert' },
      { name: 'Sainte-Anne-de-Beaupre', slug: 'sainte-anne-de-beaupre' },
      { name: 'Sainte-Foy', slug: 'sainte-foy' },
      { name: 'Sainte-Therese', slug: 'sainte-therese' },
      { name: 'Sept-Iles', slug: 'sept-iles' },
      { name: 'Sherbrooke', slug: 'sherbrooke' },
      { name: 'Sorel-Tracy', slug: 'sorel-tracy' },
      { name: 'Trois-Rivieres', slug: 'trois-rivieres' },
      { name: 'Val-d\'Or', slug: 'val-dor' },
      { name: 'Waskaganish', slug: 'waskaganish' }
    ]
  },
  {
    name: 'British Columbia',
    code: 'BC',
    cities: [
      { name: 'Barkerville', slug: 'barkerville' },
      { name: 'Burnaby', slug: 'burnaby' },
      { name: 'Campbell River', slug: 'campbell-river' },
      { name: 'Chilliwack', slug: 'chilliwack' },
      { name: 'Courtenay', slug: 'courtenay' },
      { name: 'Cranbrook', slug: 'cranbrook' },
      { name: 'Dawson Creek', slug: 'dawson-creek' },
      { name: 'Delta', slug: 'delta' },
      { name: 'Esquimalt', slug: 'esquimalt' },
      { name: 'Fort Saint James', slug: 'fort-saint-james' },
      { name: 'Fort Saint John', slug: 'fort-saint-john' },
      { name: 'Hope', slug: 'hope' },
      { name: 'Kamloops', slug: 'kamloops' },
      { name: 'Kelowna', slug: 'kelowna' },
      { name: 'Kimberley', slug: 'kimberley' },
      { name: 'Kitimat', slug: 'kitimat' },
      { name: 'Langley', slug: 'langley' },
      { name: 'Nanaimo', slug: 'nanaimo' },
      { name: 'Nelson', slug: 'nelson' },
      { name: 'New Westminster', slug: 'new-westminster' },
      { name: 'North Vancouver', slug: 'north-vancouver' },
      { name: 'Oak Bay', slug: 'oak-bay' },
      { name: 'Penticton', slug: 'penticton' },
      { name: 'Powell River', slug: 'powell-river' },
      { name: 'Prince George', slug: 'prince-george' },
      { name: 'Prince Rupert', slug: 'prince-rupert' },
      { name: 'Quesnel', slug: 'quesnel' },
      { name: 'Revelstoke', slug: 'revelstoke' },
      { name: 'Rossland', slug: 'rossland' },
      { name: 'Trail', slug: 'trail' },
      { name: 'Vancouver', slug: 'vancouver' },
      { name: 'Vernon', slug: 'vernon' },
      { name: 'Victoria', slug: 'victoria' },
      { name: 'West Vancouver', slug: 'west-vancouver' },
      { name: 'White Rock', slug: 'white-rock' }
    ]
  },
  {
    name: 'Alberta',
    code: 'AB',
    cities: [
      { name: 'Banff', slug: 'banff' },
      { name: 'Brooks', slug: 'brooks' },
      { name: 'Calgary', slug: 'calgary' },
      { name: 'Edmonton', slug: 'edmonton' },
      { name: 'Fort McMurray', slug: 'fort-mcmurray' },
      { name: 'Grande Prairie', slug: 'grande-prairie' },
      { name: 'Jasper', slug: 'jasper' },
      { name: 'Lake Louise', slug: 'lake-louise' },
      { name: 'Lethbridge', slug: 'lethbridge' },
      { name: 'Medicine Hat', slug: 'medicine-hat' },
      { name: 'Red Deer', slug: 'red-deer' },
      { name: 'Saint Albert', slug: 'saint-albert' }
    ]
  },
  {
    name: 'Saskatchewan',
    code: 'SK',
    cities: [
      { name: 'Batoche', slug: 'batoche' },
      { name: 'Cumberland House', slug: 'cumberland-house' },
      { name: 'Estevan', slug: 'estevan' },
      { name: 'Moose Jaw', slug: 'moose-jaw' },
      { name: 'Prince Albert', slug: 'prince-albert' },
      { name: 'Regina', slug: 'regina' },
      { name: 'Saskatoon', slug: 'saskatoon' },
      { name: 'Uranium City', slug: 'uranium-city' }
    ]
  },
  {
    name: 'Manitoba',
    code: 'MB',
    cities: [
      { name: 'Brandon', slug: 'brandon' },
      { name: 'Churchill', slug: 'churchill' },
      { name: 'Dauphin', slug: 'dauphin' },
      { name: 'Flin Flon', slug: 'flin-flon' },
      { name: 'Kildonan', slug: 'kildonan' },
      { name: 'Saint Boniface', slug: 'saint-boniface' },
      { name: 'Swan River', slug: 'swan-river' },
      { name: 'Thompson', slug: 'thompson' },
      { name: 'Winnipeg', slug: 'winnipeg' },
      { name: 'York Factory', slug: 'york-factory' }
    ]
  },
  {
    name: 'Nova Scotia',
    code: 'NS',
    cities: [
      { name: 'Baddeck', slug: 'baddeck' },
      { name: 'Digby', slug: 'digby' },
      { name: 'Glace Bay', slug: 'glace-bay' },
      { name: 'Halifax', slug: 'halifax' },
      { name: 'Liverpool', slug: 'liverpool' },
      { name: 'Louisbourg', slug: 'louisbourg' },
      { name: 'Lunenburg', slug: 'lunenburg' },
      { name: 'Pictou', slug: 'pictou' },
      { name: 'Springhill', slug: 'springhill' },
      { name: 'Sydney', slug: 'sydney' },
      { name: 'Yarmouth', slug: 'yarmouth' }
    ]
  },
  {
    name: 'New Brunswick',
    code: 'NB',
    cities: [
      { name: 'Bathurst', slug: 'bathurst' },
      { name: 'Caraquet', slug: 'caraquet' },
      { name: 'Chatham', slug: 'chatham' },
      { name: 'Dalhousie', slug: 'dalhousie' },
      { name: 'Fredericton', slug: 'fredericton' },
      { name: 'Miramichi', slug: 'miramichi' },
      { name: 'Moncton', slug: 'moncton' },
      { name: 'Saint John', slug: 'saint-john' }
    ]
  },
  {
    name: 'Prince Edward Island',
    code: 'PE',
    cities: [
      { name: 'Borden', slug: 'borden' },
      { name: 'Cavendish', slug: 'cavendish' },
      { name: 'Charlottetown', slug: 'charlottetown' },
      { name: 'Souris', slug: 'souris' },
      { name: 'Summerside', slug: 'summerside' }
    ]
  },
  {
    name: 'Newfoundland and Labrador',
    code: 'NL',
    cities: [
      { name: 'Argentia', slug: 'argentia' },
      { name: 'Bonavista', slug: 'bonavista' },
      { name: 'Channel-Port aux Basques', slug: 'channel-port-aux-basques' },
      { name: 'Corner Brook', slug: 'corner-brook' },
      { name: 'Ferryland', slug: 'ferryland' },
      { name: 'Gander', slug: 'gander' },
      { name: 'Grand Falls-Windsor', slug: 'grand-fallswindsor' },
      { name: 'Happy Valley-Goose Bay', slug: 'happy-valleygoose-bay' },
      { name: 'Harbour Grace', slug: 'harbour-grace' },
      { name: 'Labrador City', slug: 'labrador-city' },
      { name: 'Placentia', slug: 'placentia' },
      { name: 'Port Hawkesbury', slug: 'port-hawkesbury' },
      { name: 'Saint Anthony', slug: 'saint-anthony' },
      { name: 'St. John\'s', slug: 'st-johns' },
      { name: 'Wabana', slug: 'wabana' }
    ]
  },
  {
    name: 'Northwest Territories',
    code: 'NT',
    cities: [
      { name: 'Fort Smith', slug: 'fort-smith' },
      { name: 'Hay River', slug: 'hay-river' },
      { name: 'Inuvik', slug: 'inuvik' },
      { name: 'Tuktoyaktuk', slug: 'tuktoyaktuk' },
      { name: 'Yellowknife', slug: 'yellowknife' }
    ]
  },
  {
    name: 'Yukon',
    code: 'YT',
    cities: [
      { name: 'Dawson', slug: 'dawson' }
    ]
  },
  {
    name: 'Nunavut',
    code: 'NU',
    cities: [
      { name: 'Iqaluit', slug: 'iqaluit' }
    ]
  }
];

// Helper functions
export function getAllCities(): LocationCity[] {
  return locationsByProvince.flatMap(province => province.cities);
}

export function getCitiesByProvince(provinceCode: string): LocationCity[] {
  const province = locationsByProvince.find(p => p.code === provinceCode);
  return province ? province.cities : [];
}

export function getProvinceByCode(provinceCode: string): Province | undefined {
  return locationsByProvince.find(p => p.code === provinceCode);
}
