// Recuperar de LocalStorage, si no hay datos inicia un array vacio
export let savedLinks = JSON.parse(localStorage.getItem('links')) || []; 

// --- NUEVA FUNCIÓN DE VALIDACIÓN (Privada para este módulo) ---
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
    // 1. Verificamos que los campos no estén vacíos
    if (!name || !url) {
        return false; 
    }

    // 2. NUEVA VALIDACIÓN: Verificamos si la URL es válida antes de guardar
    if (!isValidUrl(url)) {
        alert("La URL introducida no es válida. Por favor, asegúrate de que sea un enlace correcto.");
        return false; // Cortamos la ejecución aquí
    }

    // 3. Si todo está bien, guardamos
    savedLinks.push({ name, url }); 
    localStorage.setItem('links', JSON.stringify(savedLinks)); 
    return true; 
}

// Lógica para borrar
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