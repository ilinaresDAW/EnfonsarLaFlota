import random as rd


# Crear y mostrar matriz
Fi = 0
Co = 0

def crear_matriz(filas, columnas):
    Fi = filas
    Co = columnas
    if Fi < 7 or Co < 7: 
        return "La matriz debe ser mayor a 7x7"
    else:  
        matriz = []
        for i in range(filas):
            fila = []
            for j in range(columnas):
                fila.append("X")
            matriz.append(fila)
        return matriz

def imprimir_matriz(matriz):
    for i in crear_matriz(Fi, Co):
        print(i)

# Crear barcos
def crear_barcoPequeño():
    salir = True
    while salir:
        PoX = rd.randint(0, Fi - 1)
        PoY = rd.randint(0, Co - 1)
        if 