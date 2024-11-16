/*
Se ingresa un valor objetivo y un arreglo de números.
se debe encontrar todas las combinaciones posibles de números que sumen el valor objetivo.
*/

console.log("Holi bb, te adoro <3");

const valorObjetivo = document.getElementById("valorObjetivo");
const listaDeNumeros = document.getElementById("listaDeNumeros");
const resultados = document.getElementById("resultados");

btnEncontrarCandidatos.addEventListener("click", () => {
	// valor objetivo convertido a número
	const valorObjetivoNum = Number(valorObjetivo.value);

	// arreglo de números convertido a array
	const listaDeNumerosArray = listaDeNumeros.value.split(",").map(Number);

	encontrarCombinaciones(valorObjetivoNum, listaDeNumerosArray);
});

// función que encuentra todas las combinaciones posibles de números que sumen el valor objetivo
function encontrarCombinaciones(valorObjetivoNum, listaDeNumerosArray) {
	const combinaciones = [];

    // función recursiva para encontrar combinaciones
    function encontrarCombinacionesRecursivas(remaining, start, currentCombination) {
        if (remaining === 0) {
            combinaciones.push([...currentCombination]);
            return;
        }
        for (let i = start; i < listaDeNumerosArray.length; i++) {
            if (remaining - listaDeNumerosArray[i] >= 0) {
                currentCombination.push(listaDeNumerosArray[i]);
                encontrarCombinacionesRecursivas(remaining - listaDeNumerosArray[i], i + 1, currentCombination);
                currentCombination.pop();
            }
        }
    }

    encontrarCombinacionesRecursivas(valorObjetivoNum, 0, []);

    resultados.innerHTML ="" ;
    // mostrar combinaciones en el DOM una debajo de la otra, separadas por coma si son más de un número
    if (combinaciones.length === 1) {
        resultados.innerHTML = `${combinaciones[0]} = ${valorObjetivoNum}`;
    } else if (combinaciones.length > 1) {
        combinaciones.forEach((combinacion) => {
            resultados.innerHTML += `${combinacion.join(", ")} = ${valorObjetivoNum} <br>`;
        });
		
	} else {
		resultados.innerHTML = "No se encontraron combinaciones";
	}
}
