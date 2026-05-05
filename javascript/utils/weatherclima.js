const API_KEY = "8fc940b129394a259bd145833262004"; //Clave personala para autorizar el acceso a la API
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json"; //Dirección de la API

export async function getWeatherData(city) { //Función asincrona para obtener los datos del tiempo
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&days=1&aqi=no&lang=es`); //Realiza la petición Fetch combinando la URL, la clave, la ciudad y parámetros de idioma
        if (!response.ok) throw new Error(`No se pudo encontrar la ciudad`); //Si la respuesta no es exitosa lanza un error
        return await response.json(); //Espera a que la respuesta se convierta a formato JSON y la devuelve
    } catch (error) { //Si algo falla, muestra el error en la consola y devuelve null
        console.error("Error en la petición:", error);
        return null;
    }
}

export function renderCurrentWeather(data, containerID) { //Para insertar la información del clima actual en el HTML
    const container = document.getElementById(containerID); //Busca el contenedor en HYML
    if (!data || !container) return; //Si no hay datos o el contenedor no existe en el HTML, detiene la función

    const {location, current} = data; //Extrae los objetos 'location' y 'current'
    //Inyecta el bloque de HTML con los datos
    container.innerHTML = `
        <div class="clima-card">
            <div class="clima-header">
                <h2>${data.location.name}</h2>
                <p>${data.current.condition.text}</p>
            </div>
            <div class="clima-body">
                <img src="${data.current.condition.icon}" alt="clima">
                <h1 class="temp-principal">${data.current.temp_c}°C</h1>
                <div class="detalles-secundarios">
                    <div class="detalle-item">💧 ${data.current.humidity}%</div>
                    <div class="detalle-item">🌬️ ${data.current.wind_kph}km/h</div>
                </div>
            </div>
            <div id="climaFuturo" class="pronostico-horas"></div>
        </div>
    `;
}

export function renderHourlyForecast(hours, containerId) { //Crea la lista de pronóstico por horas
    const container = document.getElementById(containerId); 
    if (!hours || !container) return;

    container.innerHTML = hours.map((hour, index) => { //Recorre el array de horas y genera un string de HTML para cada una
        const time = hour.time.split(' ')[1]; //Solo coge la hora
        //Retorna una lista con la hora, icono y temperatura
        return `
            <li class="forecast-item">
                <span class="hour">${time}</span>
                <img src="${hour.condition.icon}" alt="Icono">
                <span class="hour-temp">${Math.round(hour.temp_c)}°</span>
            </li>
        `;
    }).join(''); //Une todos los elementos de la lista en un solo texto sin comas 
}
