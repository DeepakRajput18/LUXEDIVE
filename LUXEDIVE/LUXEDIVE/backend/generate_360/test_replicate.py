import os
import replicate
from dotenv import load_dotenv
import json

load_dotenv()

try:
    print("Testing lucataco/sdxl...")
    model = replicate.models.get("lucataco/sdxl")
    version = model.latest_version.id
    
    output = replicate.run(
        f"lucataco/sdxl:{version}",
        input={
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2021_Toyota_Camry_Hybrid.jpg/800px-2021_Toyota_Camry_Hybrid.jpg",
            "prompt": "Side view of a car, white studio background",
            "prompt_strength": 0.55,
            "num_inference_steps": 20,
            "guidance_scale": 7.5,
        }
    )
except Exception as e:
    with open("replicate_error.txt", "w") as f:
        f.write(f"EXCEPTION TYPE: {type(e)}\n")
        f.write(f"STATUS: {getattr(e, 'status', 'N/A')}\n")
        f.write(f"REPR: {repr(e)}\n")
        try:
            f.write(f"DICT: {json.dumps(e.__dict__, indent=2)}\n")
        except:
            pass

