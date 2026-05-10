//Recupera de LocalStorage, si no hay datos inicia un array vacio
export let savedLinks = JSON.parse(localStorage.getItem('links')) || []; 

//FUNCIÓN DE VALIDACIÓn
const isValidUrl = (url) => {
    try {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(url);
    } catch (e) {
        return false;
    }
};

export function addLink(name, url) { 
    //Verifica que los campos no estén vacíos
    if (!name || !url) {
        return false; 
    }

    //Verifica si la URL es válida antes de guardar
    if (!isValidUrl(url)) {
        alert("La URL introducida no es válida. Por favor, asegúrate de que sea un enlace correcto.");
        return false; //Corta la ejecución aquí
    }

    //Si todo está bien, guarda
    savedLinks.push({ name, url }); 
    localStorage.setItem('links', JSON.stringify(savedLinks)); 
    return true; 
}

//Lógica para borrar
export function deleteLink(name, url) { 
    savedLinks = savedLinks.filter(link => link.name !== name || link.url !== url); 
    localStorage.setItem('links', JSON.stringify(savedLinks)); 
}

export function createLinkElement(link, onDeleteCallback) { 
    const li = document.createElement('li'); 
    li.innerHTML = `
        <a href="${link.url}" target="_blank">${link.name}</a>
        <button class="delete-btn">X</button>
    `; 

    li.querySelector('.delete-btn').addEventListener('click', () => { 
        deleteLink(link.name, link.url); 
        onDeleteCallback(); 
    });

    return li; 
}