const configLink = document.getElementById('configES');

// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const response = await fetch(configLink.href);
        const config = await response.json();
        console.log('Configuración cargada:', config);
        // Usar la configuración en tu aplicación
    } catch (error) {
        console.error('Error cargando configuración:', error);
    }

}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);

