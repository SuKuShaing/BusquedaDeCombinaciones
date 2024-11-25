/*
Se ingresa un valor objetivo y un arreglo de números.
se debe encontrar todas las combinaciones posibles de números que sumen el valor objetivo.
*/

// Mensaje de prueba en la consola
console.log("Holi bb, te adoro <3");

// Verifica si el navegador soporta service workers
if ("serviceWorker" in navigator) {
	// Registra el service worker
	navigator.serviceWorker
		.register("service-worker.js")
		.then(function (registration) {
			console.log("Service Worker registrado con éxito:", registration); // Mensaje de éxito
		})
		.catch(function (error) {
			console.log("Error al registrar el Service Worker:", error); // Mensaje de error
		});
}

// Obtiene referencias a los elementos del DOM
const valorObjetivo = document.getElementById("valorObjetivo");
const listaDeNumeros = document.getElementById("listaDeNumeros");
const resultados = document.getElementById("resultados");
const btnEncontrarCandidatos = document.getElementById(
	"btnEncontrarCandidatos"
);
const btnEncontrar100 = document.getElementById("btnEncontrar100");
const btnEncontrarMil = document.getElementById("btnEncontrarMil");
const btnEncontrarDiez = document.getElementById("btnEncontrar10");

// Función para manejar la búsqueda de combinaciones
function buscarCombinaciones(limite) {
	resultados.innerHTML = ""; // Limpia los resultados anteriores
	document.getElementById("loading").style.display = "block"; // Muestra el indicador de carga

	const valorObjetivoNum = Number(valorObjetivo.value); // Convierte el valor objetivo a número
	const listaDeNumerosArray = listaDeNumeros.value.split(",").map(Number); // Convierte la lista de números a un array de números

	if (navigator.serviceWorker.controller) {
		const messageChannel = new MessageChannel(); // Crea un canal de mensajes

		messageChannel.port1.onmessage = (event) => {
			document.getElementById("loading").style.display = "none"; // Oculta el indicador de carga

			const combinaciones = event.data.combinaciones; // Obtiene las combinaciones del mensaje
			const operaciones = event.data.operaciones; // Obtiene el número de operaciones del mensaje
			resultados.innerHTML += `Operaciones realizadas: ${colocarPuntos(
				operaciones
			)}<br>`; // Muestra el número de operaciones
			resultados.innerHTML += `Cantidad de combinaciones encontradas: ${colocarPuntos(
				combinaciones.length
			)}<br><br>`; // Muestra la cantidad de combinaciones

			if (combinaciones.length === 1) {
				combinaciones.forEach((combinacion) => {
					const combinacionDiv = document.createElement("div");
					combinacionDiv.classList.add("unaCombinacion");
					combinacionDiv.textContent = `${combinacion} = ${valorObjetivoNum}`;
					combinacionDiv.addEventListener("click", () => {
						document.querySelectorAll(".unaCombinacion").forEach((el) => {
							el.style.fontWeight = "normal";
						});
						combinacionDiv.style.fontWeight = "bold";
						mostrarBotones(combinacionDiv, combinacion);
					});
					resultados.appendChild(combinacionDiv);
				});
                // resultados.innerHTML += `<div class="unaCombinacion">${combinaciones[0]} = ${valorObjetivoNum}</div>`; // Muestra la única combinación encontrada
			} else if (combinaciones.length > 1) {
				combinaciones.forEach((combinacion) => {
					const combinacionDiv = document.createElement("div");
					combinacionDiv.classList.add("unaCombinacion");
					combinacionDiv.textContent = `${combinacion.join(", ")} = ${valorObjetivoNum}`;
					combinacionDiv.addEventListener("click", () => {
						document.querySelectorAll(".unaCombinacion").forEach((el) => {
							el.style.fontWeight = "normal";
						});
						combinacionDiv.style.fontWeight = "bold";
						mostrarBotones(combinacionDiv, combinacion);
					});
					resultados.appendChild(combinacionDiv);
				});
			} else {
				resultados.innerHTML += "<div>No se encontraron combinaciones</div>"; // Muestra un mensaje si no se encontraron combinaciones
			}
		};

		// Envía un mensaje al service worker con los datos necesarios
		navigator.serviceWorker.controller.postMessage(
			{
				valorObjetivoNum: valorObjetivoNum,
				listaDeNumerosArray: listaDeNumerosArray,
				limite: limite,
			},
			[messageChannel.port2]
		);
	}
}

function mostrarBotones(combinacionDiv, combinacion) {
	// Eliminar cualquier botón de acción existente
	document.querySelectorAll(".botonesAccion").forEach((el) => el.remove());

	const botonesDiv = document.createElement("div");
	botonesDiv.classList.add("botonesAccion");

	const btnBorrar = document.createElement("button");
	btnBorrar.textContent = "Borrar Números de la lista";
	btnBorrar.addEventListener("click", () => {
		const listaActual = listaDeNumeros.value.split(",").map(Number);
		const nuevaLista = listaActual.filter(num => !combinacion.includes(num));
		listaDeNumeros.value = nuevaLista.join(",");
		botonesDiv.remove();
	});

	// const btnCancelar = document.createElement("button");
	// btnCancelar.textContent = "Cancelar";
	// btnCancelar.addEventListener("click", () => {
	// 	botonesDiv.remove();
	// });

	botonesDiv.appendChild(btnBorrar);
	// botonesDiv.appendChild(btnCancelar);
	combinacionDiv.appendChild(botonesDiv);
}

// Añadir eventos a los nuevos botones
btnEncontrar100.addEventListener("click", () => buscarCombinaciones(100)); // Evento para buscar combinaciones con límite 100
btnEncontrarMil.addEventListener("click", () => buscarCombinaciones(1000)); // Evento para buscar combinaciones con límite 1000
btnEncontrarDiez.addEventListener("click", () => buscarCombinaciones(10)); // Evento para buscar combinaciones con límite 10
btnEncontrarCandidatos.addEventListener("click", () => {
	const confirmacion = confirm(
		"La búsqueda puede ser muy intensiva en uso de los recursos de tu computador y puede hacer fallar la página. ¿Aceptas los riesgos?"
	);
	if (confirmacion) {
		buscarCombinaciones(Infinity); // Evento para buscar combinaciones sin límite
	}
});

// Función para formatear números con puntos
function colocarPuntos(numero) {
	return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Añade puntos como separadores de miles
}
