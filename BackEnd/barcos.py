import random as rd


# Crear y mostrar matriz
class taulell:
    def __init__(self, Filas, Columnas, tabla, lista_barcos):
        self.Filas = Filas
        self.Columnas = Columnas
        self.tabla = []
        self.lista_barcos = []

    def crear_matriz(filas, columnas):
        if filas < 7 or columnas < 7: 
            return "La matriz debe ser mayor a 7x7"
        else:  
            taulell.Filas = filas
            taulell.Columnas = columnas
            matriz = []
            for i in range(filas):
                fila = []
                for j in range(columnas):
                    fila.append("X")
                matriz.append(fila)
            taulell.tabla = matriz
            return matriz

# Crear barcos

class barcos:
    def __init__(self, tamaño, cords):
        self.tamaño = tamaño
        self.cords = []
    
    def comprobar_direccion(PoX, PoY, tamaño):
        listaTemp = []
        if PoX + (tamaño -1) <= (taulell.Filas - 1):
            listaTemp.append(PoX + (tamaño -1))
            if PoX - (tamaño -1) >= 0 :
                listaTemp.append(PoX - (tamaño -1))
                if PoY + (tamaño -1) <= (taulell.Columnas - 1):
                    listaTemp.append(PoY + (tamaño -1))
                    if PoY - (tamaño -1) >= 0:
                        listaTemp.append(PoY - (tamaño -1))
        elif PoX - (tamaño -1) >= 0 :
            listaTemp.append(PoX - (tamaño -1))
            if PoY + (tamaño -1) <= (taulell.Columnas - 1):
                listaTemp.append(PoY + (tamaño -1))
                if PoY - (tamaño -1) >= 0:
                    listaTemp.append(PoY - (tamaño -1))
        elif PoY + (tamaño -1) <= (taulell.Columnas - 1):
            listaTemp.append(PoY + (tamaño -1))
            if PoY - (tamaño -1) >= 0:
                listaTemp.append(PoY - (tamaño -1))
        elif PoY - (tamaño -1) >= 0:
            listaTemp.append(PoY - (tamaño -1))
        return listaTemp
        
    def crear_barcoPequeño():
        salir = True
        while salir:
            PoX = rd.randint(0, taulell.Filas - 1)
            PoY = rd.randint(0, taulell.Columnas - 1)
            for barcos in taulell.lista_barcos:
                for cords in barcos:
                    if PoX == cords or PoY == cords:
                        pass
                    else:   
                        barcos.tamaño = 1
                        barcos.cords.append(PoX,PoY) 
                        taulell.lista_barcos.append(barcos)
                        salir = False
    
    def crear_barcoGrande(tamaño):
        salir = True
        while salir:
            PoX = rd.randint(0, taulell.Filas - 1)
            PoY = rd.randint(0, taulell.Columnas - 1) 
            for barcos in taulell.lista_barcos:
                for cords in barcos:
                    if PoX == cords or PoY == cords:
                        pass
                    
                            #usar funcion de comprobar las direcciones  
                            


