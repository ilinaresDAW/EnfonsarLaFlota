from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random as rd

# Crear la aplicación
app = FastAPI()

# Ruta raíz
@app.get("/")
def read_root():
    return {"mensaje": "Hola alumnos!"}

# Para añadir al compa
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def crear_matriz(filas, columnas):
    matriz = []
    for i in range(filas):
        fila = []
        for j in range(columnas):
            fila.append(-1)
        matriz.append(fila)
    return matriz

for i in crear_matriz(7,7):
    print(i)
