import time
import sys
import os

# Add the current directory to sys.path so we can import car_360_generator
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from car_360_generator import process_queue_item
except ImportError as e:
    print(f"[Error] Could not import process_queue_item from car_360_generator.py: {e}")
    sys.exit(1)

def main():
    print("[START] 360 Generator Worker Started")
    print("Watching car_360_queue for new items...")
    
    while True:
        try:
            success = process_queue_item()
            if success:
                print("[SUCCESS] Successfully processed an item. Checking for more...")
                # Continue immediately if we found and processed an item
            else:
                # No items found or error occurred, wait before checking again
                time.sleep(10)
        except KeyboardInterrupt:
            print("\n[STOP] Worker stopping...")
            break
        except Exception as e:
            print(f"[ERROR] Worker error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    main()
