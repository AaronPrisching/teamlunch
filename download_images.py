import requests
import os

def download_image(url, filename):
    if os.path.exists(filename):
        print(f"{filename} existiert bereits. Wird übersprungen.")
        return
    
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(filename, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        
        print(f"{filename} erfolgreich heruntergeladen.")
    except Exception as e:
        print(f"Fehler beim Herunterladen von {filename}: {e}")

# Erstelle Verzeichnisse, falls sie nicht existieren
os.makedirs("images", exist_ok=True)

# Burger-Bild für die Startseite
download_image(
    "https://raw.githubusercontent.com/michalsnik/aos/master/demo/hamburger.png", 
    "images/burger-3d.png"
)

# Weitere Bilder für die Bestellseite
download_image(
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "images/burger-restaurant.jpg"
)

download_image(
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1299&q=80",
    "images/classic-burger.jpg"
)

download_image(
    "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    "images/vegan-burger.jpg"
)

download_image(
    "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    "images/fries.jpg"
)

print("Alle Bilder wurden heruntergeladen oder existieren bereits.") 