const configLink = document.getElementById('configES');
const perfilLink = document.getElementById('perfilJS');

// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const [config, perfil] = await Promise.all([
            fetch(configLink.href).then(r => r.json()),
            fetch(perfilLink.href).then(r => r.json())
        ]);

        console.log('Datos cargados:', { config, perfil });
        cargarPerfil(config, perfil);

        // Usar la configuración en tu aplicación
    } catch (error) {
        console.error('Error cargando configuración:', error);
    }

}

function cargarPerfil(cfg,data) {
    // Seleccionar todos los td de la tabla
    const cells1 = document.querySelectorAll('.tabla-perfil td:nth-child(1)');
            
    // Asignar valores desde el JSON
    cells1[0].textContent = cfg.color;
    cells1[1].textContent = cfg.libro;
    cells1[2].textContent = cfg.musica;
    cells1[3].textContent = cfg.video_juego;
    cells1[4].textContent = cfg.lenguajes;

    // Seleccionar todos los td de la tabla
    const cells2 = document.querySelectorAll('.tabla-perfil td:nth-child(2)');
            
    // Asignar valores desde el JSON
    cells2[0].textContent = data.color;
    cells2[1].textContent = data.libro;
    cells2[2].textContent = data.musica;
    cells2[3].textContent = data.video_juego;
    cells2[4].textContent = `<strong>${data.lenguajes}</strong>`;
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);