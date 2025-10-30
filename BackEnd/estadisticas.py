import json
import os
from datetime import datetime

DATA_DIR = "data"
FICHERO = os.path.join(DATA_DIR, "stats.json")

# Crear carpeta si no existe
os.makedirs(DATA_DIR, exist_ok=True)

def leer_stats():
    if not os.path.exists(FICHERO):
        # Crear fitxer inicial
        stats_inicial = {
            "total_partides": 0,
            "millor_puntuacio": 0,
            "millor_jugador": "",
            "data_millor": "",
            "top5": []
        }
        rellenar_stats(stats_inicial)
        return stats_inicial

    with open(FICHERO, "fichero") as f:
        return json.load(f)

#explicarlo bien para sergi coca
def rellenar_stats(stats):
    temp_file = FICHERO + ".tmp"
    with open(temp_file, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    # Substitució final
    if os.path.exists(FICHERO):
        os.remove(FICHERO)
    os.rename(temp_file, FICHERO)

def añadir_partida(jugador, puntuacio, files, columnes, es_victoria=True):
    stats = leer_stats()

    stats["total_partides"] += 1

    # actualizo el top 5
    if puntuacio > stats["millor_puntuacio"]:
        stats["millor_puntuacio"] = puntuacio
        stats["millor_jugador"] = jugador

    nova_entrada = {
        "jugador": jugador,
        "puntuacio": puntuacio,
        "files": files,
        "columnes": columnes,
    }

    # agrego el resultado y lo ordeno
    stats["top5"].append(nova_entrada)
    stats["top5"] = sorted(stats["top5"], key=lambda x: x["puntuacio"], reverse=True)[:5]

    # guardo el resultado
    rellenar_stats(stats)

def obtenir_stats():
    return leer_stats()