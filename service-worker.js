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
    let operaciones = 0;

    // Función iterativa para encontrar combinaciones que sumen el valor objetivo
    function encontrarCombinacionesIterativas() {
        const stack = [{ remaining: valorObjetivoNum, start: 0, currentCombination: [] }];
        
        while (stack.length > 0) {
            operaciones++;
            const { remaining, start, currentCombination } = stack.pop();
            
            if (remaining === 0) {
                combinaciones.push([...currentCombination]);
                continue;
            }
            
            for (let i = start; i < listaDeNumerosArray.length; i++) {
                if (remaining - listaDeNumerosArray[i] >= 0) {
                    stack.push({
                        remaining: remaining - listaDeNumerosArray[i],
                        start: i + 1,
                        currentCombination: [...currentCombination, listaDeNumerosArray[i]]
                    });
                }
            }
        }
    }

    // Inicia la búsqueda de combinaciones
    encontrarCombinacionesIterativas();

    // Envía las combinaciones encontradas de vuelta al cliente
    event.ports[0].postMessage({ combinaciones: combinaciones, operaciones: operaciones });
});