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

    // Función heurística para encontrar combinaciones que sumen el valor objetivo
    function encontrarCombinacionesHeuristicas() {
        const priorityQueue = [{ remaining: valorObjetivoNum, start: 0, currentCombination: [], heuristic: valorObjetivoNum }];
        
        while (priorityQueue.length > 0) {
            operaciones++;
            // Ordenar la cola de prioridad por la heurística (menor primero)
            priorityQueue.sort((a, b) => a.heuristic - b.heuristic);
            const { remaining, start, currentCombination } = priorityQueue.shift();
            
            if (remaining === 0) {
                combinaciones.push([...currentCombination]);
                continue;
            }
            
            for (let i = start; i < listaDeNumerosArray.length; i++) {
                if (remaining - listaDeNumerosArray[i] >= 0) {
                    const newCombination = [...currentCombination, listaDeNumerosArray[i]];
                    const newRemaining = remaining - listaDeNumerosArray[i];
                    const heuristic = newRemaining; // Heurística simple: valor restante
                    priorityQueue.push({
                        remaining: newRemaining,
                        start: i + 1,
                        currentCombination: newCombination,
                        heuristic: heuristic
                    });
                }
            }
        }
    }

    // Inicia la búsqueda de combinaciones
    encontrarCombinacionesHeuristicas();

    // Envía las combinaciones encontradas de vuelta al cliente
    event.ports[0].postMessage({ combinaciones: combinaciones, operaciones: operaciones });
});