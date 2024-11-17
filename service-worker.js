// Evento que se dispara cuando se instala el service worker
self.addEventListener('install', event => {
    // Fuerza al service worker a activarse inmediatamente después de la instalación
    self.skipWaiting();
});

// Evento que se dispara cuando el service worker se activa
self.addEventListener('activate', event => {
    // Toma el control de las páginas bajo su scope sin esperar a que se recarguen
    self.clients.claim();
});

// Evento que se dispara cuando se recibe un mensaje
self.addEventListener('message', event => {
    // Desestructuración de los datos recibidos en el mensaje
    const { valorObjetivoNum, listaDeNumerosArray } = event.data;
    const combinaciones = [];

    // Función recursiva para encontrar combinaciones que sumen el valor objetivo
    function encontrarCombinacionesRecursivas(remaining, start, currentCombination) {
        // Si el valor restante es 0, se ha encontrado una combinación válida
        if (remaining === 0) {
            combinaciones.push([...currentCombination]);
            return;
        }
        // Itera sobre los números en la lista
        for (let i = start; i < listaDeNumerosArray.length; i++) {
            // Si el número actual puede ser parte de la combinación
            if (remaining - listaDeNumerosArray[i] >= 0) {
                // Añade el número actual a la combinación
                currentCombination.push(listaDeNumerosArray[i]);
                // Llama recursivamente con el nuevo valor restante y la siguiente posición
                encontrarCombinacionesRecursivas(remaining - listaDeNumerosArray[i], i + 1, currentCombination);
                // Elimina el último número añadido para probar nuevas combinaciones
                currentCombination.pop();
            }
        }
    }

    // Inicia la búsqueda de combinaciones
    encontrarCombinacionesRecursivas(valorObjetivoNum, 0, []);

    // Envía las combinaciones encontradas de vuelta al cliente
    event.ports[0].postMessage({ combinaciones: combinaciones });
});