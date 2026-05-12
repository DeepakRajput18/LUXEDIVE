const MODEL_SPECIFIC_IMAGES: Record<string, string> = {
    // ── EXOTIC / HYPERCAR (New) ────────────────────────────────────────────────
    'Bugatti Mistral': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&q=80&w=2070&sig=mistral',
    'Ferrari Purosangue': 'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?auto=format&fit=crop&q=80&w=2070&sig=purosangue',
    'Lamborghini Temerario': 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=2070&sig=temerario',
    'McLaren 750S': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070&sig=750s',
    'Aston Martin DBS 770 Ultimate': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070&sig=dbs770',
    'Ferrari 12Cilindri': 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2070&sig=12cil',
    'Porsche 911 GT3 RS': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2070&sig=gt3rs',
    'Lamborghini Aventador Ultimae': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070&sig=ultimae',
    'Maserati MC20 Cielo': 'https://images.unsplash.com/photo-1610904572707-a11e6b39ce80?auto=format&fit=crop&q=80&w=2070&sig=mc20cielo',
    'Koenigsegg Regera Hybrid': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070&sig=regera2',

    // ── ULTRA LUXURY SEDAN & SUV (New) ────────────────────────────────────────
    'Rolls Royce Spectre': 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&q=80&w=2070&sig=spectre',
    'Mercedes-Maybach S680': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070&sig=s680',
    'Bentley Batur': 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=2070&sig=batur',
    'Range Rover SV': 'https://images.unsplash.com/photo-1628157791478-f73ac8572b93?auto=format&fit=crop&q=80&w=2070&sig=rrsv',
    'BMW XM Label Red': 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=2070&sig=xmred',
    'Audi RS Q8 Performance': 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2070&sig=rsq8perf',
    'Porsche Cayenne Turbo GT': 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=2070&sig=cayennegt',
    'Lexus LM 350h': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=lm350h',
    'Cadillac Escalade V': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070&sig=escaladeV',
    'Mercedes-AMG GLS 63': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=gls63',
    'BMW Alpina B7': 'https://images.unsplash.com/photo-1556189250-72ba954e9664?auto=format&fit=crop&q=80&w=2070&sig=alpinab7',
    'Audi A8 Horch': 'https://images.unsplash.com/photo-1603584173870-7b299f589c00?auto=format&fit=crop&q=80&w=2070&sig=a8horch',
    'Genesis GV80 Prestige': 'https://images.unsplash.com/photo-1628157791478-f73ac8572b93?auto=format&fit=crop&q=80&w=2070&sig=gv80',
    'Volvo XC90 Excellence': 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=2070&sig=xc90exc',
    'Toyota Land Cruiser 300 GR': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070&sig=lc300gr',

    // ── PERFORMANCE & SPORTS (New) ────────────────────────────────────────────
    'Nissan GT-R R35': 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2070&sig=gtrr35',
    'Toyota GR Supra Manual': 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?auto=format&fit=crop&q=80&w=2070&sig=supramanual',
    'Chevrolet Corvette C8 Stingray': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2070&sig=c8stingray',
    'Ford Mustang Dark Horse': 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=2070&sig=darkhorse',
    'Alpine A110 R': 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=2070&sig=a110r',
    'Jaguar F-Type 75': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2070&sig=ftype75',
    'Porsche Boxster GTS': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070&sig=boxstergts',
    'BMW M5 CS': 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=2070&sig=m5cs',
    'Mercedes-AMG SL 43': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=2070&sig=sl43',
    'Audi RS5 Sportback': 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2070&sig=rs5sb',
    'Dodge Challenger Hellcat': 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=2070&sig=hellcat',
    'Maserati GranTurismo Modena': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070&sig=grantmod',
    'Lotus Emira V6 First Edition': 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2070&sig=emirav6',
    'Acura NSX Type S': 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=2070&sig=nsxtypes',
    'Tesla Model X Plaid': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=mxplaid',

    // ── WEDDING / CLASSIC / STATEMENT (New) ───────────────────────────────────
    'Rolls Royce Silver Wraith Classic': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070&sig=silverwraith',
    'Bentley Arnage': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=2070&sig=arnage',
    'Mercedes-Benz 600 Pullman Classic': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070&sig=600pullman',
    'Jaguar XJ Classic': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=2070&sig=xjclassic',
    'Cadillac DeVille Classic': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070&sig=deville',
    'Bentley Azure Convertible': 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=2070&sig=azure',
    'Rolls Royce Wraith Black Badge': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070&sig=wraithbb',
    'Mercedes-Benz G Wagon 4x4²': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070&sig=gwagon4x4',
    'Lamborghini Urus SE': 'https://images.unsplash.com/photo-1544605975-fd12871f3014?auto=format&fit=crop&q=80&w=2070&sig=urusse',
    'Ferrari Portofino M': 'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?auto=format&fit=crop&q=80&w=2070&sig=portofinm',

    'Ferrari F8 Tributo': 'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?auto=format&fit=crop&q=80&w=2070',
    'Ferrari 488': 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2070',
    'Ferrari 812': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070',
    'Ferrari 458': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2070',
    'Ferrari SF90': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=2070',

    'Lamborghini Aventador': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070',
    'Lamborghini Huracan': 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=2070',
    'Lamborghini Urus': 'https://images.unsplash.com/photo-1544605975-fd12871f3014?auto=format&fit=crop&q=80&w=2070',
    'Lamborghini Gallardo': 'https://images.unsplash.com/photo-1621135802920-1f0c7f90754e?auto=format&fit=crop&q=80&w=2070',

    'Porsche 911': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2070',
    'Porsche Taycan': 'https://images.unsplash.com/photo-1614165936126-899f6d3b6582?auto=format&fit=crop&q=80&w=2070',
    'Porsche Panamera': 'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?auto=format&fit=crop&q=80&w=2070',
    'Porsche Cayenne': 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=2070',
    'Porsche 718': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070',

    'McLaren 720S': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070',
    'McLaren P1': 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=2070',
    'McLaren GT': 'https://images.unsplash.com/photo-1621135802920-1f0c7f90754e?auto=format&fit=crop&q=80&w=2070&sig=mclaren',
    'McLaren 765LT': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070&sig=765',

    'Rolls Royce Phantom': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=2070',
    'Rolls Royce Ghost': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070',
    'Rolls Royce Cullinan': 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&q=80&w=2070',
    'Rolls Royce Wraith': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=2070&sig=wraith',

    'Bentley Continental': 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=2070',
    'Bentley Bentayga': 'https://images.unsplash.com/photo-1541443131876-44b4e45cd674?auto=format&fit=crop&q=80&w=2070',
    'Bentley Flying Spur': 'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&q=80&w=2070&sig=spur',
    'Bentley Mulsanne': 'https://images.unsplash.com/photo-1541443131876-44b4e45cd674?auto=format&fit=crop&q=80&w=2070&sig=mulsanne',

    'Bugatti Chiron': 'https://images.unsplash.com/photo-1566008885484-f37a0786e90d?auto=format&fit=crop&q=80&w=2070',
    'Bugatti Veyron': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&q=80&w=2070',
    'Bugatti Divo': 'https://images.unsplash.com/photo-1566008885484-f37a0786e90d?auto=format&fit=crop&q=80&w=2070&sig=divo',

    'Aston Martin DB11': 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=2070',
    'Aston Martin DBS': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070',
    'Aston Martin Vantage': 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=2070&sig=vantage',
    'Aston Martin DBX': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070&sig=dbx',

    'Mercedes S-Class': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070',
    'Mercedes G-Wagon': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070',
    'Mercedes AMG GT': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=2070',
    'Mercedes E-Class': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=eclass',
    'Mercedes Maybach': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070&sig=maybach',

    'BMW M8': 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=2070',
    'BMW 7 Series': 'https://images.unsplash.com/photo-1556189250-72ba954e9664?auto=format&fit=crop&q=80&w=2070',
    'BMW X7': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070',
    'BMW M5': 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=2070&sig=m5',
    'BMW i8': 'https://images.unsplash.com/photo-1556189250-72ba954e9664?auto=format&fit=crop&q=80&w=2070&sig=i8',

    'Audi R8': 'https://images.unsplash.com/photo-1603584173870-7b299f589c00?auto=format&fit=crop&q=80&w=2070',
    'Audi RS7': 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2070',
    'Audi A8': 'https://images.unsplash.com/photo-1603584173870-7b299f589c00?auto=format&fit=crop&q=80&w=2070&sig=a8',
    'Audi Q8': 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2070&sig=q8',

    'Range Rover Vogue': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070',
    'Range Rover Sport': 'https://images.unsplash.com/photo-1628157791478-f73ac8572b93?auto=format&fit=crop&q=80&w=2070',
    'Range Rover Velar': 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=2070&sig=velar',
    'Range Rover Evoque': 'https://images.unsplash.com/photo-1628157791478-f73ac8572b93?auto=format&fit=crop&q=80&w=2070&sig=evoque',

    'Pagani Huayra': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&q=80&w=2070&sig=huayra',
    'Pagani Zonda': 'https://images.unsplash.com/photo-1566008885484-f37a0786e90d?auto=format&fit=crop&q=80&w=2070&sig=zonda',

    'Koenigsegg Jesko': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070&sig=jesko',
    'Koenigsegg Agera': 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&q=80&w=2070&sig=agera',
    'Koenigsegg Regera': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070&sig=regera',

    'Maserati Quattroporte': 'https://images.unsplash.com/photo-1610904572707-a11e6b39ce80?auto=format&fit=crop&q=80&w=2070',
    'Maserati GranTurismo': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070&sig=gran',
    'Maserati Levante': 'https://images.unsplash.com/photo-1610904572707-a11e6b39ce80?auto=format&fit=crop&q=80&w=2070&sig=levante',

    'Jaguar F-Type': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2070',
    'Jaguar XJ': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2070&sig=xj',
    'Jaguar F-Pace': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=2070&sig=fpace',

    'Tesla Model S': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2070',
    'Tesla Model X': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=modelx',
    'Tesla Model 3': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2070&sig=model3',
};

const WEDDING_CAR_IMAGES = [
    '/wedding-car.jpg',
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2070',
];

const CATEGORY_FALLBACK_IMAGES: Record<string, string[]> = {
    'EXOTIC': [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070&sig=ex1',
        'https://images.unsplash.com/photo-1566008885484-f37a0786e90d?auto=format&fit=crop&q=80&w=2070&sig=ex2',
        'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b1?auto=format&fit=crop&q=80&w=2070&sig=ex3',
        'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?auto=format&fit=crop&q=80&w=2070&sig=ex4',
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2070&sig=ex5',
    ],
    'SUPERCAR': [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070&sig=sc1',
        'https://images.unsplash.com/photo-1566008885484-f37a0786e90d?auto=format&fit=crop&q=80&w=2070&sig=sc2',
        'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=2070&sig=sc3',
    ],
    'SPORTS': [
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2070&sig=sp1',
        'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=2070&sig=sp2',
        'https://images.unsplash.com/photo-1614165936126-899f6d3b6582?auto=format&fit=crop&q=80&w=2070&sig=sp3',
        'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?auto=format&fit=crop&q=80&w=2070&sig=sp4',
    ],
    'LUXURY': [
        'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=2070&sig=lx1',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2070&sig=lx2',
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2070&sig=lx3',
        'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&q=80&w=2070&sig=lx4',
    ],
    'WEDDING': WEDDING_CAR_IMAGES,
};

const imageUsageMap = new Map<string, Set<string>>();

export function getCarImage(brand: string, model: string, category?: string, carId?: string): string {
    const key = `${brand} ${model}`.trim();

    if (MODEL_SPECIFIC_IMAGES[key]) {
        return MODEL_SPECIFIC_IMAGES[key];
    }

    const partialMatch = Object.keys(MODEL_SPECIFIC_IMAGES).find(k => {
        const lower = k.toLowerCase();
        const brandLower = brand.toLowerCase();
        const modelLower = model.toLowerCase();
        return lower.includes(modelLower) && lower.includes(brandLower);
    });

    if (partialMatch) {
        return MODEL_SPECIFIC_IMAGES[partialMatch];
    }

    const categoryKey = (category || 'EXOTIC').toUpperCase();
    const fallbackImages = CATEGORY_FALLBACK_IMAGES[categoryKey] || CATEGORY_FALLBACK_IMAGES['EXOTIC'];

    if (carId) {
        if (!imageUsageMap.has(carId)) {
            const hash = (brand + model + carId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const selectedImage = fallbackImages[hash % fallbackImages.length];
            imageUsageMap.set(carId, new Set([selectedImage]));
            return selectedImage;
        }
        return Array.from(imageUsageMap.get(carId)!)[0];
    }

    const hash = (brand + model).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return fallbackImages[hash % fallbackImages.length];
}

export const HERO_BACKGROUNDS = {
    home: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070',
    fleet: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2070',
    contact: 'https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=2070'
};
