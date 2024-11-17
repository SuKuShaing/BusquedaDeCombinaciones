/*
Se ingresa un valor objetivo y un arreglo de números.
se debe encontrar todas las combinaciones posibles de números que sumen el valor objetivo.
*/

// Mensaje de prueba en la consola
console.log("Holi bb, te adoro <3");

// Verifica si el navegador soporta service workers
if ('serviceWorker' in navigator) {
    // Registra el service worker
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration);
    }).catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
    });
}

// Obtiene referencias a los elementos del DOM
const valorObjetivo = document.getElementById("valorObjetivo");
const listaDeNumeros = document.getElementById("listaDeNumeros");
const resultados = document.getElementById("resultados");
const btnEncontrarCandidatos = document.getElementById("btnEncontrarCandidatos");

// Añade un evento click al botón para encontrar combinaciones
btnEncontrarCandidatos.addEventListener("click", () => {
    // Limpia el elemento de resultados
    resultados.innerHTML = "";
    // Muestra la animación de carga
    document.getElementById("loading").style.display = "block";
    // Convierte el valor objetivo a número
    const valorObjetivoNum = Number(valorObjetivo.value);
    // Convierte la lista de números a un array de números
    const listaDeNumerosArray = listaDeNumeros.value.split(",").map(Number);

    // Verifica si el service worker está controlando la página
    if (navigator.serviceWorker.controller) {
        // Crea un canal de comunicación para recibir la respuesta del service worker
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = event => {
            // Oculta la animación de carga
            document.getElementById("loading").style.display = "none";
            // Obtiene las combinaciones del mensaje recibido
            const combinaciones = event.data.combinaciones;
            const operaciones = event.data.operaciones;
            // Muestra el número de operaciones en el elemento de resultados
            resultados.innerHTML += `Operaciones realizadas: ${operaciones}<br><br>`;
            // Muestra las combinaciones en el elemento de resultados
            if (combinaciones.length === 1) {
                resultados.innerHTML += `${combinaciones[0]} = ${valorObjetivoNum}`;
            } else if (combinaciones.length > 1) {
                combinaciones.forEach((combinacion) => {
                    resultados.innerHTML += `${combinacion.join(", ")} = ${valorObjetivoNum} <br>`;
                });
                
            } else {
                resultados.innerHTML += "No se encontraron combinaciones";
            }
            
        }

        // Envía un mensaje al service worker con los datos necesarios
        navigator.serviceWorker.controller.postMessage({
            valorObjetivoNum: valorObjetivoNum,
            listaDeNumerosArray: listaDeNumerosArray
        }, [messageChannel.port2]);
    }
});