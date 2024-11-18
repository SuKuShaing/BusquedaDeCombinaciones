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
        console.log('Service Worker registrado con éxito:', registration); // Mensaje de éxito
    }).catch(function(error) {
        console.log('Error al registrar el Service Worker:', error); // Mensaje de error
    });
}

// Obtiene referencias a los elementos del DOM
const valorObjetivo = document.getElementById("valorObjetivo");
const listaDeNumeros = document.getElementById("listaDeNumeros");
const resultados = document.getElementById("resultados");
const btnEncontrarCandidatos = document.getElementById("btnEncontrarCandidatos");
const btnEncontrar100 = document.getElementById("btnEncontrar100");
const btnEncontrarMil = document.getElementById("btnEncontrarMil");

// Función para manejar la búsqueda de combinaciones
function buscarCombinaciones(limite) {
    resultados.innerHTML = ""; // Limpia los resultados anteriores
    document.getElementById("loading").style.display = "block"; // Muestra el indicador de carga
    const valorObjetivoNum = Number(valorObjetivo.value); // Convierte el valor objetivo a número
    const listaDeNumerosArray = listaDeNumeros.value.split(",").map(Number); // Convierte la lista de números a un array de números

    if (navigator.serviceWorker.controller) {
        const messageChannel = new MessageChannel(); // Crea un canal de mensajes
        messageChannel.port1.onmessage = event => {
            document.getElementById("loading").style.display = "none"; // Oculta el indicador de carga
            const combinaciones = event.data.combinaciones; // Obtiene las combinaciones del mensaje
            const operaciones = event.data.operaciones; // Obtiene el número de operaciones del mensaje
            resultados.innerHTML += `Operaciones realizadas: ${colocarPuntos(operaciones)}<br>`; // Muestra el número de operaciones
            resultados.innerHTML += `Cantidad de combinaciones encontradas: ${colocarPuntos(combinaciones.length)}<br><br>`; // Muestra la cantidad de combinaciones
            if (combinaciones.length === 1) {
                resultados.innerHTML += `${combinaciones[0]} = ${valorObjetivoNum}`; // Muestra la única combinación encontrada
            } else if (combinaciones.length > 1) {
                combinaciones.forEach((combinacion) => {
                    resultados.innerHTML += `${combinacion.join(", ")} = ${valorObjetivoNum} <br>`; // Muestra cada combinación encontrada
                });
            } else {
                resultados.innerHTML += "No se encontraron combinaciones"; // Muestra un mensaje si no se encontraron combinaciones
            }
        }

        // Envía un mensaje al service worker con los datos necesarios
        navigator.serviceWorker.controller.postMessage({
            valorObjetivoNum: valorObjetivoNum,
            listaDeNumerosArray: listaDeNumerosArray,
            limite: limite
        }, [messageChannel.port2]);
    }
}

// Añadir eventos a los nuevos botones
btnEncontrar100.addEventListener("click", () => buscarCombinaciones(100)); // Evento para buscar combinaciones con límite 100
btnEncontrarMil.addEventListener("click", () => buscarCombinaciones(1000)); // Evento para buscar combinaciones con límite 1000
btnEncontrarCandidatos.addEventListener("click", () => {
    const confirmacion = confirm("La búsqueda puede ser muy intensiva en uso de los recursos de tu computador y puede hacer fallar la página. ¿Aceptas los riesgos?");
    if (confirmacion) {
        buscarCombinaciones(Infinity); // Evento para buscar combinaciones sin límite
    }
});

// Función para formatear números con puntos
function colocarPuntos(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Añade puntos como separadores de miles
}