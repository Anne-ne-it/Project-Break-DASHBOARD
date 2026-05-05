//RELOJ DIGITAL
export const initRelojDigital = () => { //Función para inicializar y actualizar el reloj
    const horaElemento = document.getElementById ("hora"); //Selecciona el elemento hora
    const fechaElemento = document.getElementById ("fecha"); //Selecciona el elemento fecha
    const mensajeElemento = document.getElementById("mensajeReloj"); //Selecciona el elemento mensaje del reloj

    if (!horaElemento || !fechaElemento || !mensajeElemento) return; //Evita errores, si no existen los id, para el proceso

    const formatoNumeros = (numero) => (numero < 10 ? `0${numero}`:numero); //Si el número es menor que 10, añade un 0 delante

    const actualizarReloj = () => { //Obtener y formatear datos de reloj, fecha y mensajes
        const ahora = new Date (); 

        const h = formatoNumeros(ahora.getHours()); //Obtener hora
        const m = formatoNumeros(ahora.getMinutes()); //Obtener minutos
        const s = formatoNumeros(ahora.getSeconds()); //Obtener segundos
        horaElemento.textContent = `${h}:${m}:${s}`; //Fotmato del reloj

        const dia = formatoNumeros(ahora.getDate()); //Obtener día
        const mes = formatoNumeros(ahora.getMonth() + 1); //Obtener mes, enero es el 0
        const aino = ahora.getFullYear(); //Obtener el año
        fechaElemento.textContent = `${dia}/${mes}/${aino}`; //Formato de la fecha

        //MENSAJES segun intervalos de tiempo
        const horaActual = ahora.getHours(); //Obtener hora
        const minutoActual = ahora.getMinutes(); //Obtener minutos
        const minutosTotales = (horaActual * 60) + minutoActual; //Convierte todo a minutos para facilitar los tramos de cada mensaje

        let mensaje = "";

        if (minutosTotales >= 1 && minutosTotales <= 420) { //De 00:01 hasta 07:00
            mensaje = "Es hora de descansar. Apaga y sigue mañana.";
        } else if (minutosTotales >= 420 && minutosTotales <= 720) { //De 07:01 hasta 12:00
            mensaje ="Buenos días, desayuna fuerte y a darle al código."; 
        } else if (minutosTotales >= 720 && minutosTotales <= 840) { //De 12:01 hasta 14:00
            mensaje = "Echa un rato más, pero no olvides comer.";
        } else if (minutosTotales >= 840 && minutosTotales <= 930) { //De 14:01 hasta 15:30
            mensaje = "Espero que hayas comido.";
        } else if (minutosTotales >= 930 && minutosTotales <= 1080) { //De 15:31 hasta 18:00
            mensaje = "Buenas tardes, el último empujón";
        } else if (minutosTotales >= 1080 && minutosTotales <= 1320) { //De 18:01 hasta 22:00
            mensaje = "Esto ya son horas extra, piensa en parar pronto.";    
        }else { //De 22:01 hasta 00:00
            mensaje = "Buenas noches, es hora de pensar en parar y descansar"
        }

        mensajeElemento.textContent = mensaje;
    };

    actualizarReloj(); //Para evitar que haya retraso 
    setInterval(actualizarReloj, 1000); //Para que se actialice cada segundo, 1 segunso son 1000 milisegundos
}