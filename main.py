import os
import json

media_folder = "media"
output_file = "media.js"

# Estensioni supportate
image_ext = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"}
video_ext = {".mp4", ".webm", ".ogg", ".mov"}  # Aggiunto .mov

media_list = []

for filename in sorted(os.listdir(media_folder)):
    ext = os.path.splitext(filename)[1].lower()
    if ext in image_ext:
        media_type = "image"
    elif ext in video_ext:
        media_type = "video"
    else:
        continue
    path = f"{media_folder}/{filename}"
    media_list.append({"name": filename, "type": media_type, "path": path})

# Genera file media.js
with open(output_file, "w") as f:
    f.write("const mediaFiles = ")
    f.write(json.dumps(media_list, indent=2))
    f.write(";")

print(f"Generato {output_file} con {len(media_list)} media.")
