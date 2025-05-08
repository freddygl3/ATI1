const configLink = document.getElementById('configES');

// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const response = await fetch(configLink.href);
        const config = await response.json();
        console.log('Configuración cargada:', config);
        // Usar la configuración en tu aplicación
        cargarCfg(config);

    } catch (error) {
        console.error('Error cargando configuración:', error);
    }

}

function cargarCfg(cfg){
    const titulo = document.getElementsByClassName('titulo')[0];
    titulo.innerHTML =  cfg.sitio[0] + `<span>${cfg.sitio[1]} </span>` + cfg.sitio[2];
    document.getElementById('foooter').textContent = cfg.copyRight;
    document.getElementsByClassName('saludo-usuario')[0].textContent = cfg.saludo;
    document.getElementById('boton').textContent = cfg.buscar;
    document.getElementsByName('q')[0].placeholder = cfg.buscar;

}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);

