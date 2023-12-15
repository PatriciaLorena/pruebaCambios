let diccionario = ["APPLE","HOUSE","MOUSE","YOUTH","GRADE","DANCE"];
let palabra = getWord();
let intentos = 6;

const input = document.getElementById("guess-input");

const endpoint = "https://random-word-api.herokuapp.com/word?length=5";
fetch(endpoint).then((response)=>{
    response.json().then((data)=>{
        console.log(data[0])
        palabra = data[0].toUpperCase();
    });
});

//hay que usar awey y asing

function getWord(){
    let min = 0;
    let max = diccionario.length;
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
   return diccionario[i];

}

const GRID = document.getElementById("grid")
const boton = document.getElementById("guess-button");
const INTENTO = leerIntento();

boton.addEventListener("click", ()=>{
    const INTENTO = leerIntento();
    //por cada letra en palabra
    const row = document.createElement("div");
    row.className = "row";
    
    for(const i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        SPAN.innerHTML = INTENTO[i]
        
        if(palabra[i]==INTENTO[i]){
            SPAN.style.backgroundColor = "green";
        }else if(palabra.includes(INTENTO[i])){
            SPAN.style.backgroundColor = "yellow";
        }else{
            SPAN.style.backgroundColor = "gray";
            
        }
        row.appendChild(SPAN);
    }
    GRID.appendChild(row);

    intentos--;
    if (INTENTO === palabra ) {
        terminar("GANASTE😀")
        return
    }
    if (!intentos){
        terminar("PERDISTE😖")
    }
    // Limpiar el contenido del input después de procesar la jugada
    input.value = "";
});

function terminar(mensaje){
    const RESULTADO =   document.getElementById('guesses')
    RESULTADO.innerHTML = `<h1>${mensaje}</h1>`
    boton.disabled = true;
    
}

function leerIntento(){
    return input.value.toUpperCase();
}

function validarInput(input) {
    let valor = input.value;

    const mensajeError = document.getElementById("mensaje-error");
        if (/[^A-Za-z]/.test(valor)) {
            mensajeError.textContent = "¡Solo se permiten letras! Los números y caracteres especiales no son permitidos.";
        } else {
            mensajeError.textContent = ""; // Limpiar el mensaje de error si la entrada es válida
        }

    // Quitar caaracteres especiales y numeros 
    valor = valor.replace(/[^A-Za-z]/g, '');
  
    // Limitar la longitud a 5 caracteres
    valor = valor.slice(0, 5);
  
    // Actualizar el valor del campo de texto
    input.value = valor;
    
  }