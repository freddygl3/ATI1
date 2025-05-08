const configLink = document.getElementById('configES');
const datosLink = document.getElementById('datosJson');

// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const [config, data] = await Promise.all([
            fetch(configLink.href).then(r => r.json()),
            fetch(datosLink.href).then(r => r.json())
        ]);

        console.log('Datos cargados:', { config, data });

        // Usar la configuración en tu aplicación
        cargarCfg(config);
        cargarData(data);

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

function cargarData(data){
    const lista_estudiantes = document.getElementsByClassName('lista-estudiantes')[0];

    data.forEach(estudiante => {
        const li = document.createElement('li');
        li.className = 'estudiante';

        const img = document.createElement('img');
        img.src = estudiante.imagen;
        img.alt = estudiante.nombre;

        const p = document.createElement('p');
        p.textContent = estudiante.nombre;

        // Obtener la CI
        const perfilID = estudiante.ci;
        li.setAttribute("data-id", perfilID);

        li.addEventListener("click", function () {
            window.location.href = `perfil.html?perfil=${perfilID}`;
        });

        li.appendChild(img);
        li.appendChild(p);
        lista_estudiantes.appendChild(li);
    });

}
// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);

