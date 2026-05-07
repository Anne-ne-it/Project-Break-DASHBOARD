//IMPORTS siempre al principio del archivo
import { goHome, footerMenu } from "./templates/template.js";
import { initBackgrounds } from './templates/backgrounds.js';
import { savedLinks, addLink, createLinkElement } from './utils/linksista.js';
import { initRelojDigital } from "./utils/relojdigital.js";
import { getWeatherData, renderCurrentWeather, renderHourlyForecast } from './utils/weatherclima.js';
import { generarClaveRandom } from './utils/keygenerador.js';


//LINKS LISTA
function initLinkList() {
    const nameInput = document.getElementById('nombre-input'); //ID HTML
    const urlInput = document.getElementById('url-input');     //ID HTML
    const addBtn = document.getElementById('botonAgregar');    //ID HTML
    const container = document.getElementById('linksContainer'); //ID HTML

    if (!container || !addBtn) return; //Si no existen o estamos en otra página, no hace nada

    const render = () => {
        container.innerHTML = "";
        savedLinks.forEach(link => {
            const el = createLinkElement(link, render);
            container.appendChild(el);
        });
    };

    addBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        
        if (addLink(name, url)) {
            nameInput.value = '';
            urlInput.value = '';
            render();
        } else {
            alert("Por favor, rellena ambos campos");
        }
    });

    render(); //Primera carga
}


//FUNCIÓN PARA EL CLIMA WEATHER
async function initApp() {
    const defaultCity = 'Donostia';
    try {
        const data = await getWeatherData(defaultCity);
        if (data) {
            //Se renderiza solo si los contenedores existen en el HTML actual
            renderCurrentWeather(data, 'climaActual'); 
            renderHourlyForecast(data.forecast.forecastday[0].hour, 'climaFuturo');
        }
    } catch (error) {
        console.error("Error en initApp:", error);
        const errorContainer = document.getElementById('climaActual');
        if (errorContainer) errorContainer.innerHTML = "<p>Error al cargar el clima.</p>";
    }
}


//FUNCIÓN PARA EL GENERADOR DE CLAVES
function initKeyGenerator() {
    const btnGenerar = document.querySelector('button[type="button"]');
    const inputLength = document.getElementById("length");
    const resultadoDiv = document.getElementById("resultadoClave");

    //Solo añade el evento si los elementos existen (estamos en la página de la clave)
    if (btnGenerar && inputLength && resultadoDiv) {
        btnGenerar.addEventListener('click', () => {
            const lengthValue = parseInt(inputLength.value);

            if (lengthValue < 12 || lengthValue > 50) {
                alert("La longitud debe estar entre 12 y 50.");
                return;
            }

            const nuevaClave = generarClaveRandom(lengthValue);
            resultadoDiv.innerHTML = `CONTRASEÑA: <strong>${nuevaClave}</strong>`;
        });
    }
}


//EVENTO PRINCIPAL DOMContentLoaded
//Aquí es donde "arranca" toda la web una vez el HTML está listo
document.addEventListener("DOMContentLoaded", () => {
    //Inyección de Menú y Footer
    const mimenu = document.getElementById("goHome");
    const mifooter = document.getElementById("footerMenu");
    
    if (mimenu) mimenu.innerHTML = goHome();
    if (mifooter) mifooter.innerHTML = footerMenu();

    //Inicialización de fondos
    initBackgrounds();

    /*Cada función interna ya comprueba si los elementos existen antes de actuar*/
    initLinkList();
    initRelojDigital();   //Solo actuará si ve el ID "reloj"
    initApp();            //Solo actuará si ve los IDs de clima
    initKeyGenerator();   //Solo actuará si ve el ID "length"
});




