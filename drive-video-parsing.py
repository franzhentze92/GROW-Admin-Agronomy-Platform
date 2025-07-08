# -*- coding: utf-8 -*-
"""
Created on Thu Jul  3 11:02:05 2025

@author: Franz Hentze
"""

import pandas as pd
import json

# Load your CSV file
file_path = "GROW Video Library Metadata or GROW Video Links Export.csv"
df = pd.read_csv(file_path)

def extract_season_number(season_str):
    return int(season_str.strip().split()[-1])

json_list = []

for _, row in df.iterrows():
    season_number = extract_season_number(row["Season"])
    
    episode_raw = str(row["Episode"]).strip()
    try:
        episode_number = int(episode_raw)
    except ValueError:
        episode_number = None

    json_obj = {
        "id": row["ID"],
        "title": row["Title"],
        "language": row["Language"],
        "season": season_number,
        "episode": episode_number,
        "series": row["Series"],
        "folder_path": row["Folder Path"],
        "original_name": row["Name"],
        "google_drive_file_id": row["ID"],
        "preview_link": row["Preview Link"],
        "download_link": row["Direct Download Link"],
        "mime_type": row["MIME Type"],
        "thumbnail_url": f"/how-to-thumbnails-languages/HTDI_S3_{row['Language']}_8.1.1_8.1.1.png"
    }

    json_list.append(json_obj)

# Write to JSON file
output_path = "GROW_Video_Metadata_FixedThumbnails.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(json_list, f, indent=2, ensure_ascii=False)

print(f"✅ JSON generated and saved to {output_path}")
