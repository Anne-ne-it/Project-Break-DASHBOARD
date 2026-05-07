export const backgrounds = [ //Array de rutas de las fotos para el fondo
    '/assets/img/01selfie.jpg',
    '/assets/img/02coche.jpg',
    '/assets/img/03cafeteria.jpg',
    '/assets/img/04estacion.jpg',
    '/assets/img/05cables.jpg',
    '/assets/img/06tunel.jpg',
    '/assets/img/07mercado.jpg',
    '/assets/img/08perro.jpg',
    '/assets/img/09maquinas.jpg',
    '/assets/img/10paraguas.jpg'
];

export function initBackgrounds() { //La función que realizará la llamada
    const changeBackground = () => { //Cofiguración para elegir y aplicar las imagenes
        const imgIndex = Math.floor(Math.random() * backgrounds.length); //Crea el indice de 0 a 9
        const imgseleccionada = backgrounds[imgIndex];

        const body = document.body; //Selecciona la etiqueta body para aplicarlo
        body.style.backgroundImage = `url("${imgseleccionada}")`; //Ruta de las imagenes
        body.style.backgroundSize = "cover"; //La imagen cubre toda la pantalla
        body.style.backgroundPosition = "center"; //Centra la imagen para no cortarla
        body.style.backgroundRepeat = "no-repeat"; //Evita que se repita, modo mosaico
        body.style.backgroundAttachment = "fixed"; //Se queda quito si hay scroll

        console.log("Intentando cargar fondo desde raíz:", imgseleccionada); //Para saber que imagen intenta cargar
    };

    changeBackground(); //Llama a la función una vez cargada la página
    setInterval(changeBackground, 10000); //Se ejecuta el cambio cada 10seg
}