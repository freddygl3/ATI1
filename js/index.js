const datosLink = document.getElementById('datosJson');

// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get("lang") || document.documentElement.lang;
        const configLang = cargarLang(lang);

        const [config, data] = await Promise.all([
            fetch(configLang).then(r => r.json()),
            fetch(datosLink.href).then(r => r.json())
        ]);

        console.log('Datos cargados:', { config, data });

        // Usar la configuración en tu aplicación
        cargarCfg(config);
        cargarData(data, lang);
        queryEstudiante(data);

    } catch (error) {
        console.error('Error cargando configuración:', error);
    }

}

function cargarLang(lang) {
    let confLang = "";
    if (lang.toLowerCase() === "es") confLang = "conf/configES.json";
    else if (lang.toLowerCase() === "en") confLang = "conf/configEN.json";
    else if (lang.toLowerCase() === "pt") confLang = "conf/configPT.json";
    return confLang;
}

function cargarCfg(cfg) {
    const titulo = document.getElementsByClassName('titulo')[0];
    titulo.innerHTML = cfg.sitio[0] + `<span>${cfg.sitio[1]} </span>` + cfg.sitio[2];
    document.getElementById('foooter').textContent = cfg.copyRight;
    document.getElementsByClassName('saludo-usuario')[0].textContent = cfg.saludo;
    document.getElementById('boton').textContent = cfg.buscar;
    document.getElementsByName('q')[0].placeholder = cfg.buscar;

}

function cargarData(data, lang) {
    const lista_estudiantes = document.getElementsByClassName('lista-estudiantes')[0];
    lista_estudiantes.innerHTML = ''; // Limpiar lista

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
        li.setAttribute('data-id', perfilID);

        li.addEventListener('click', function () {
            window.location.href = `perfil.html?perfil=${perfilID}&lang=${lang}`;
        });

        li.appendChild(img);
        li.appendChild(p);
        lista_estudiantes.appendChild(li);
    });

}

function queryEstudiante(data) {
    const estudiantes = data;
    const entradaBusqueda = document.querySelector('input[name="q"]');
    const listaEstudiantes = document.querySelector('.lista-estudiantes');

    entradaBusqueda.addEventListener('input', (e) => {
        const queryText = e.target.value.trim();
        const query = queryText.toLowerCase();
        const filtrados = estudiantes.filter(est =>
            est.nombre.toLowerCase().includes(query)
        );

        cargarData(filtrados); // Actualiza la lista con resultados filtrados

        // Mostrar mensaje si no hay resultados y la búsqueda no está vacía
        if (filtrados.length === 0 && queryText !== '') {
            const mensaje = document.createElement('li');
            mensaje.textContent = `No hay alumnos que tengan en su nombre: ${queryText}`;
            mensaje.className = 'noHay';
            listaEstudiantes.appendChild(mensaje);
        }
    });
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);

