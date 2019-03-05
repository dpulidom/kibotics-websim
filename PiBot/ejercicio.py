#!/usr/bin/env python
# coding: utf-8

# # Ejercicio Siguelínea Infrarrojos
# 
# ## Tabla resumen de sensores y actuadores
# 
# | Función                 | Descripción                                                  |
# | ----------------------- | ------------------------------------------------------------ |
# | `leerIRSigueLineas()` | Lee los dos sensores de IR y nos devuelve un valor entre 0 y 3. |
# | `avanzar(v)`        | Hace que el PiBot avance en línea recta con una velocidad lineal igual a `v` expresada en metros/segundo. |
# | `retroceder(v)`     | Hace que el PiBot retroceda en línea recta con una velocidad lineal igual a `v` expresada en metros/segundo. |
# | `girarIzquierda(w)` | Hace que el PiBot gire a la izquierda sobre su eje (sin avanzar) con una velocidad angular igual a `w` expresada en radianes/segundo. |
# | `girarDerecha(w)`   | Hace que el PiBot gire a la derecha sobre su eje (sin avanzar) con una velocidad angular igual a `w` expresada en radianes/segundo. |
# | `parar()`            | Hace que el PiBot se detenga (si estaba avanzando, retrocediendo o girando). |
#     
#     
#     
# El valor entre 0 y 3 que devuelve la función depende de las lecturas de los dos sensores de IR, de acuerdo a la siguiente tabla:
# 
# | lectura IR izquierdo |lectura IR derecho | valor de leerIRSigueLineas() |
# |--------|--------|--------|
# | negro | negro | 0 |
# | negro | blanco | 1 |
# | blanco | negro | 2 |
# | blanco | blanco | 3 |
# 
# Estos cuatro valores que nos devuelve la función `leerIRSigueLineas()` se corresponden con:
# 
#     
# |valor = 0| valor = 1 |valor = 2 |valor = 3 |
# |--------|--------|--------|--------|
# |![image](https://kibotics.org/static/img/notebooks_images/sigue_linea_ir/sigue_linea_ir_cero.png)|![image](https://kibotics.org/static/img/notebooks_images/sigue_linea_ir/sigue_linea_ir_uno.png)|![image](https://kibotics.org/static/img/notebooks_images/sigue_linea_ir/sigue_linea_ir_dos.png)|![image](https://kibotics.org/static/img/notebooks_images/sigue_linea_ir/sigue_linea_ir_tres.png)|

# In[ ]:


# Importar las librerías necesarias.
import sys
sys.path.insert(0, '/usr/local/lib/python2.7')
sys.path.insert(0, '/opt/jderobot/lib/python2.7')

import PiBot
import time



if __name__ == "__main__":
    # Insert code here