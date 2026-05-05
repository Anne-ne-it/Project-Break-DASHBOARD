//MENU HOME
export const goHome = () => { //Exporta la función del menú para poder usarla
    //LOGICA DE LAS RUTAS
    const isRoot = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/'); //Detecta donde está el usuario
    const assetPrefix = isRoot ? './' : '../'; //En la raiz las páginas están en ./, si está dentro usa ../

    //Retorna el string de HTML (Template Literal) con las rutas inyectadas
    return ` 
    <nav class="goHome-container">
        <a href="${isRoot ? './index.html' : '../index.html'}" class="logocohete">
            <img src="${assetPrefix}/assets/cohete.png" alt="cohete">
            <h2>Go Home</h2>
        </a>
    </nav>`;
}

//FOOTER
export const footerMenu = () => { //Exporta la función que genera el contenido del pie de página
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname === '/'; //Detecta donde está el usuario
    const pathPrefix = isRoot ? './HTML/' : './'; //En la raiz las páginas están en ./HTML/, si está dentro usa ./

    // Retorna el string de HTML (Template Literal) con las rutas inyectadas
    return `
        <ul class="botones-menu">
            <li><a href="${pathPrefix}linkslista.html"><img src="" alt="linkslista"></a></li>
            <li><a href="${pathPrefix}relojdigital.html"><img src="" alt="relojdigital"></a></li>
            <li><a href="${pathPrefix}weatherclima.html"><img src="" alt="weatherclima"></a></li>
            <li><a href="${pathPrefix}keygenerador.html"><img src="" alt="keygenerador"></a></li>
        </ul>
    `;
};