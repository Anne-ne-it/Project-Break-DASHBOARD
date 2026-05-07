//Recuperar de LocalStorage, si no hay datos inicia un array vacio
export let savedLinks = JSON.parse(localStorage.getItem('links')) || []; //Convierte el texto de LocalStorage en objeto/array

export function addLink(name, url) { //Lógica para añadir un nuevo enlace en la lista
    if (name && url) { //Verifica que el nombre y la url tengas contenido
        savedLinks.push({ name, url }); //Agrega un nuevo objeto con el nombre y la url
        localStorage.setItem('links', JSON.stringify(savedLinks)); //Guarda el nuevo array y lo convierte en texto
        return true; //Retorna true para saber que la operación fue correcta
    }
    return false; //Retorna falso si algun campo está vacio
}

//Lógica para borrar, la x
export function deleteLink(name, url) { 
    savedLinks = savedLinks.filter(link => link.name !== name || link.url !== url); //Crea un nuevo array excluyendo el enlace que coincide en nombre y url
    localStorage.setItem('links', JSON.stringify(savedLinks)); //Actualiza el localStorage
}

export function createLinkElement(link, onDeleteCallback) { //Creador de elementos HTML (Template)
    const li = document.createElement('li'); //Crea un elemento de lista <li> en la memoria del navegador
    li.innerHTML = `
        <a href="${link.url}" target="_blank">${link.name}</a>
        <button class="delete-btn">X</button>
    `; //Para definir el contenido interno del <li> con un template string

    li.querySelector('.delete-btn').addEventListener('click', () => { //Busca el botón de borrar recién creado dentro del <li>
        deleteLink(link.name, link.url); //Función de refrescar la vista que le pasamos desde el main.js
        onDeleteCallback(); //Llama a la función render del main
    });

    return li; //Devuelve el <li> completo y listo para ser añadido al DOM
}