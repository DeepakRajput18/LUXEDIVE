import os
from dotenv import load_dotenv
from serpapi import GoogleSearch

load_dotenv()

SERPAPI_KEY = os.getenv('SERPAPI_KEY')

print("🔍 Testing Google Image Search...")
print()

query = "Lamborghini Aventador SVJ car front view"

try:
    search = GoogleSearch({
        "q": query,
        "tbm": "isch",
        "api_key": SERPAPI_KEY,
        "num": 3
    })
    
    response = search.get_dict()
    images = response.get("images_results", [])
    
    if images:
        print(f"✅ Found {len(images)} images")
        print()
        for i, img in enumerate(images[:3], 1):
            url = img.get('original') or img.get('thumbnail')
            print(f"Image {i}: {url[:80]}...")
    else:
        print("❌ No images found")
        print("Response:", response)
        
except Exception as e:
    print(f"❌ Error: {e}")
