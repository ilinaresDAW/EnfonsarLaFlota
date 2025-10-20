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
        
    def cords_ocupadas(self):
        ocupadas = set()
        for barco in self.lista_barcos:
            for cord in barco.cords:
                ocupadas.add(cord)
        return ocupadas

# Crear barcos

class barcos:
    def __init__(self, tamaño, cords):
        self.tamaño = tamaño
        self.cords = []
    
    def comprobar_direccion(self, PoX, PoY, direccion, tamaño):
        coords = []
        if direccion == 'X1':  # Horizontal arriba
            if PoX + (tamaño - 1) > taulell.columnas - 1:
                pass
            for i in range(tamaño):
                coords.append((PoY, PoX + i))
        elif direccion == "X2":   # Horizontal abajo
            if PoX - (tamaño - 1) > 0:
                    pass
            for i in range(tamaño):
                coords.append((PoY, PoX - i))
        elif direccion == 'Y1':  # Vertical arriba
            if PoX + (tamaño - 1) > taulell.filas - 1:
                pass
            for i in range(tamaño):
                coords.append((PoX, PoY + i))
        elif direccion == "Y2": # Vertical abajo
            if PoY - (tamaño - 1) > 0:
                    pass
            for i in range(tamaño):
                coords.append((PoX, PoY - i))
        return coords
        
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
    
    def crear_barcoGrande(self, tamaño):
        salir = True
        ocupado = taulell.cords_ocupadas
        cordsBarco = []
        cordsTemp = []
        while salir:
            PoX = rd.randint(0, taulell.Filas - 1)
            PoY = rd.randint(0, taulell.Columnas - 1)
            cordUsarX1 = self.comprobar_direccion(PoX, PoY, "X1", tamaño)
            cordUsarX2 = self.comprobar_direccion(PoX, PoY, "X2", tamaño)
            cordUsarY2 = self.comprobar_direccion(PoX, PoY, "Y2", tamaño)
            cordUsarY1 = self.comprobar_direccion(PoX, PoY, "Y1", tamaño)
            if not cordUsarX1 and not cordUsarX2 and not cordUsarY1 and not cordUsarY2:
                pass
            else:
                for i in cordUsarX1:
                    if i == ocupado:
                        cordsTemp.clear
                        break
                    else:
                        cordsTemp.append(i)
                if cordsTemp != cordUsarX1:
                    for i in cordUsarX2:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)
                if cordsTemp != cordUsarX2:
                    for i in cordUsarY1:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)
                if cordsTemp != cordUsarY1:
                    for i in cordUsarY2:
                        if i == ocupado:
                            cordsTemp.clear
                            break
                        else:
                            cordsTemp.append(i)

            

