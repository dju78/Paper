import json
import os
from datetime import datetime
from scholarly import scholarly

def fetch_metrics():
    scholar_id = "gw0w3s4AAAAJ"
    data_path = os.path.join("src", "data", "scholar_metrics.json")
    
    # Load existing data as fallback
    try:
        with open(data_path, "r") as f:
            existing_data = json.load(f)
    except Exception:
        existing_data = {
            "citations": 0,
            "h_index": 0,
            "i10_index": 0,
            "last_updated": datetime.now().strftime("%Y-%m-%d")
        }

    try:
        print(f"Fetching Google Scholar metrics for {scholar_id}...")
        author = scholarly.search_author_id(scholar_id)
        author = scholarly.fill(author, sections=['basics', 'indices', 'counts'])
        
        metrics = {
            "citations": author.get("citedby", 0),
            "h_index": author.get("hindex", 0),
            "i10_index": author.get("i10index", 0),
            "last_updated": datetime.now().strftime("%Y-%m-%d")
        }
        
        with open(data_path, "w") as f:
            json.dump(metrics, f, indent=2)
        print("Successfully updated scholar_metrics.json")
        
    except Exception as e:
        print(f"Error fetching metrics: {e}")
        print("Falling back to existing data.")
        # If the file doesn't exist yet, write the initial zeros
        if not os.path.exists(data_path):
            with open(data_path, "w") as f:
                json.dump(existing_data, f, indent=2)

if __name__ == "__main__":
    fetch_metrics()
