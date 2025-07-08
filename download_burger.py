import requests
import os

def download_image(url, filename):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(filename, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"{filename} erfolgreich heruntergeladen.")
        return True
    except Exception as e:
        print(f"Fehler beim Herunterladen von {filename}: {e}")
        return False

# Alternativer URL für das Burger-Bild
urls = [
    "https://www.freepnglogos.com/uploads/burger-png/burger-png-transparent-burger-images-pluspng-10.png",
    "https://www.freeiconspng.com/uploads/hamburger-png-picture-1.png",
    "https://www.pngmart.com/files/16/Cheese-Burger-PNG-Transparent-Image.png"
]

success = False
for url in urls:
    if download_image(url, "images/burger-3d.png"):
        success = True
        break

if success:
    print("Burger-Bild erfolgreich heruntergeladen.")
else:
    print("Alle Versuche zum Herunterladen des Burger-Bilds sind fehlgeschlagen.") 