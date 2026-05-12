import urllib.request
import urllib.parse
import json
import csv
import os
import time

def fetch_osm_sector(bbox, retries=3):
    mirrors = [
        'https://overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
        'https://overpass.osm.ch/api/interpreter',
        'https://overpass.nchc.org.tw/api/interpreter'
    ]
    
    query = f"""[out:csv(name, "addr:housenumber", "addr:street", "addr:suburb", "addr:postcode", ::lat, ::lon; true; ",")];
(
  node["name"]({bbox});
  way["name"]({bbox});
  relation["name"]({bbox});
);
out center;"""
    
    for attempt in range(retries):
        # Rotate mirrors
        url = mirrors[attempt % len(mirrors)]
        data = urllib.parse.urlencode({'data': query}).encode('utf-8')
        
        try:
            req = urllib.request.Request(url, data=data)
            with urllib.request.urlopen(req) as response:
                content = response.read().decode('utf-8')
                return content
        except Exception as e:
            wait_time = (attempt + 1) * 3
            print(f"  Attempt {attempt + 1} failed with mirror {url}: {e}. Retrying in {wait_time}s...")
            time.sleep(wait_time)
            
    return None

def process_csv_content(csv_content):
    lines = csv_content.strip().split('\n')
    if len(lines) < 2:
        return []
    
    reader = csv.DictReader(lines)
    locations = []
    
    for row in reader:
        name = row.get('name', '').strip()
        if not name:
            continue
            
        lat = row.get('@lat', '')
        lon = row.get('@lon', '')
        if not lat or not lon:
            continue
            
        # Build full address
        parts = [name]
        house = row.get('addr:housenumber', '').strip()
        street = row.get('addr:street', '').strip()
        suburb = row.get('addr:suburb', '').strip()
        postcode = row.get('addr:postcode', '').strip()
        
        if house: parts.append(house)
        if street: parts.append(street)
        if suburb: parts.append(suburb)
        if postcode: parts.append(postcode)
        parts.append("Ahmedabad")
        
        full_address = ", ".join(parts)
        
        locations.append({
            "name": name,
            "full": full_address,
            "lat": float(lat),
            "lon": float(lon)
        })
    
    return locations

def main():
    import random
    # Grid boundaries for Ahmedabad + 20km
    lat_min, lat_max = 22.84, 23.20
    lon_min, lon_max = 72.39, 72.75
    steps = 5 # 5x5 grid = 25 sectors
    
    lat_step = (lat_max - lat_min) / steps
    lon_step = (lon_max - lon_min) / steps
    
    all_locations = {} # Use dict for deduplication by name+lat+lon
    
    sectors = []
    for i in range(steps):
        for j in range(steps):
            sectors.append((i, j))
            
    # Randomize sectors to avoid hitting the same area too sequentially
    random.shuffle(sectors)
    
    print(f"Starting patient granular grid-based crawl of Ahmedabad ({steps}x{steps} sectors)...")
    
    for count, (i, j) in enumerate(sectors):
        s_lat_min = lat_min + (i * lat_step)
        s_lat_max = s_lat_min + lat_step
        s_lon_min = lon_min + (j * lon_step)
        s_lon_max = s_lon_min + lon_step
        
        bbox = f"{s_lat_min:.4f},{s_lon_min:.4f},{s_lat_max:.4f},{s_lon_max:.4f}"
        print(f"[{count+1}/{len(sectors)}] Fetching sector {i+1},{j+1}: {bbox}...")
        
        sector_csv = fetch_osm_sector(bbox)
        if sector_csv:
            locations = process_csv_content(sector_csv)
            for loc in locations:
                # Create a unique key to deduplicate
                key = f"{loc['name']}|{loc['lat']:.5f}|{loc['lon']:.5f}"
                all_locations[key] = loc
            print(f"  Found {len(locations)} locations. Total unique: {len(all_locations)}")
        
        # Very conservative delay between requests to avoid 429
        time.sleep(5)
            
    final_locations = list(all_locations.values())
    print(f"Crawl complete. Total unique locations found: {len(final_locations)}")
    
    output_path = r'c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE\LUXEDIVE\src\data\ahmedabad_locations.json'
    
    # Save the massive dataset
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(final_locations, f, indent=2, ensure_ascii=False)
        
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    main()
