//Función auxiliar
function obtenerCaracterRandom(caracteres) { //Selecciona un solo carácter de una cadena de texto recibida
    const randomIndex = Math.floor(Math.random() * caracteres.length); //Genera un número entero aleatorio entre 0 y el total de caracteres disponibles
    return caracteres.charAt(randomIndex); //Devuelve el caracter de dicha posición
}

export function generarClaveRandom(lengthValue) { //Función para crear la contraseña segun la longitud deseada
    //Gupos de caracteres que puede tener la contraseña
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()-_=+";

    let clave = ""; //Inicia la cadena de contraseña vacia

    //Garantiza que la clave tenga uno de cada tipo
    clave += obtenerCaracterRandom(mayusculas);
    clave += obtenerCaracterRandom(minusculas);
    clave += obtenerCaracterRandom(numeros);
    clave += obtenerCaracterRandom(simbolos);

    const todos = mayusculas + minusculas + numeros + simbolos; //Una cadena que contiene absolutamente todos los caracteres

    for (let i = clave.length; i < lengthValue; i++) { //Rellena el resto de la contraseña hasta alcanzar la longitud
        clave += obtenerCaracterRandom(todos); //Añade caracteres aleatorios del grupo total
    }

    //Mezclamos el resultado final
    return clave.split('') //Convierte la cadena de texto en array
    .sort(() => Math.random() - 0.5) //Reordena el array de forma aleatoria
    .join(''); //Vuelve a unir los caracteres del array en una sola cadena
}