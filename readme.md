# SuperMegaPrograma de búsqueda de combinaciones para la Clau

Holi mi corazón rico, he aquí el programa que me pidió, con love, Seba

## Web disponible para usar
https://sukushaing.github.io/BusquedaDeCombinaciones/

### ToDo
- [X] Crear una rama, y que lo procese con un enfoque iterativo en vez de recursivo, para ver sí así no saturamos la memoria
-> No Funcionó el enfoque Iterativo ni por Búsqueda Heuristica, en los 3 casos (incluyendo el recursivo) colapsa la página en la solicitud limite, obj:100, lista [1,al,20] 
- [X] Colocarle separador de miles al número de operaciones realizadas y a Cantidad de combinaciones 
- [X] hacerlo Mobile
- [X] Colocar un botón de "los primeros 10"
- [ ] Hacer que se puedan seleccionar un resultado, y sacar los números de ese resultado de la lista de opciones ingresada por el usuario


## Llevar al Límite
- [X] Encontrar el punto en el que el algoritmo falle por stack overflow y solucionarlo
-> Se añadieron sistemas en que retorno pocos resultados para evitar el fallo, puesto que pasando los 30 mil resultados, se cae en mi pc, tal vez en pc con más ram, aguante más, pero depende del equipo en el que esté funcionando
- [ ] Probar con una lista gigante de 300 o más números 