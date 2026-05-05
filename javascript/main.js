// MENU NAVEGACION, FOOTER, RELOJ
import { goHome, footerMenu } from "./templates/template.js"; //Importa las funciones que generan el HTML del menú y el pie de página
import { initRelojDigital } from "./utils/relojdigital.js"; //Importa la función encargada del reloj digital
import { getWeatherData, renderCurrentWeather, renderHourlyForecast } from './utils/weatherclima.js'; //Importa las funciones para obtener datos de la API de clima

document.addEventListener("DOMContentLoaded", () => { //Escucha el evento para que el código se ejecute solo cuando el HTML esté cargado
    const mimenu = document.getElementById("goHome"); //Obtiene la referencia del DOM por su ID
    const mifooter = document.getElementById("footerMenu"); //Obtiene la referencia del DOM por su ID
    const mireloj = document.getElementById("reloj"); //Obtiene la referencia del DOM por su ID

    if (mimenu) mimenu.innerHTML = goHome(); //Si el elemento del menú existe, inserta el contenido HTML
    if (mifooter) mifooter.innerHTML = footerMenu(); //Si el elemento del menú existe, inserta el contenido HTML
    if (mireloj) initRelojDigital(); //Si el elemento del menú existe, inserta el contenido HTML

    initApp(); //Llama a la función principal para cargar los datos del clima
});

//CLIMA WEATHER
async function initApp() { //Función asíncrona que gestiona la carga inicial de los datos del clima
    const defaultCity = 'Donostia'; //Define la ciudad por defecto para la consulta inicial
    const data = await getWeatherData(defaultCity); //Llama a la API y espera (await) a recibir los datos

    if (data) {
        renderCurrentWeather(data, 'climaActual'); //Si hay datos, renderiza la información del clima actual en el contenedor 'climaActual'
        renderHourlyForecast(data.forecast.forecastday[0].hour, 'climaFuturo'); //Renderiza el pronóstico por horas del primer día en el contenedor 'climaFuturo'
    } else { //Si ocurre un error o no hay datos, busca el contenedor de clima para mostrar un mensaje de error
        const errorContainer = document.getElementById('climaActual');
        if (errorContainer) errorContainer.innerHTML = "<p>Error al cargar el clima.</p>"; 
    }
}
