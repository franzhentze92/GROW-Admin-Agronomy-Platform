import re
import os
import pandas as pd
from collections import defaultdict

# Open the nutrients.js file
with open("nutrients.js", "r", encoding="utf-8") as f:
    content = f.read()

# Prepare output folder
output_folder = "exported_excels"
os.makedirs(output_folder, exist_ok=True)

# Dictionary to hold nutrient names per category
category_data = defaultdict(list)

# Find all blocks like: export const soilHealth = [ ... ];
category_blocks = re.findall(
    r'export const ([a-zA-Z]+) = \[\s*(.*?)\s*\];',
    content,
    flags=re.DOTALL
)

# Extract names from each block
for category_raw, block in category_blocks:
    category_key = category_raw.strip()  # like "soilHealth"
    category_clean = re.sub(r'([A-Z])', r'_\1', category_key).lower().replace("_health", "")  # e.g. soil_health
    nutrient_names = re.findall(r'name:\s*["\']([^"\']+)["\']', block)
    category_data[category_clean].extend(nutrient_names)

# Write one Excel file per category
for category, nutrients in category_data.items():
    df = pd.DataFrame(nutrients, columns=["Nutrient"])
    output_path = os.path.join(output_folder, f"{category}_health.xlsx")
    df.to_excel(output_path, index=False)
    print(f"✅ Saved: {output_path}")

print("\nAll files exported successfully.")
