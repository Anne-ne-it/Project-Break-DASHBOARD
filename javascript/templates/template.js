//MENU HOME
export const goHome = () => { //Crea la función para luego importarla
    const isRoot = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/'); //Detecta si el usuario está en la raíz (index.html)
    const assetPrefix = isRoot ? './' : '../'; //Si está en la raíz usa ./, si está en la carpeta HTML usa ../ para salir a buscar assets

    return ` 
    <nav class="goHome-container">
        <a href="${isRoot ? './index.html' : '../index.html'}" class="logocohete">
            <img src="${assetPrefix}assets/logos/cohetehome.png" alt="cohete">
            <h2>Go Home</h2>
        </a>
    </nav>`;
}

//FOOTER
export const footerMenu = () => { //Crea la función para luego importarla
    const isRoot = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/'); //Detecta si el usuario está en la raíz
    const pathPrefix = isRoot ? './html/' : './'; //Prefijo para los enlaces (.html)
    const assetPrefix = isRoot ? './' : '../'; //Prefijo para las imagenes (assets)

    return `
        <ul class="botones-menu">
            <li><a href="${pathPrefix}linkslista.html"><img src="${assetPrefix}assets/logos/links.jpg" alt="links"></a></li>
            <li><a href="${pathPrefix}relojdigital.html"><img src="${assetPrefix}assets/logos/reloj.jpg" alt="reloj"></a></li>
            <li><a href="${pathPrefix}weatherclima.html"><img src="${assetPrefix}assets/logos/weather.jpg" alt="clima"></a></li>
            <li><a href="${pathPrefix}keygenerador.html"><img src="${assetPrefix}assets/logos/contraseña.jpg" alt="llave"></a></li>
        </ul>
    `;
};