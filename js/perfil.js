// Función para cargar la configuración
async function cargarConfiguracion() {
    try {
        const lang = document.documentElement.lang;
        const configLang = cargarLang(lang);
        const urlParams = new URLSearchParams(window.location.search);
        const perfilID = urlParams.get('perfil');

        console.log(configLang);
        const [config, perfil] = await Promise.all([
            fetch(configLang).then(r => r.json()),
            fetch(`${perfilID}/perfil.json`).then(r => r.json())
        ]);
        console.log(`${perfilID}/perfil.json`);
        console.log('Datos cargados:', { config, perfil });
        cargarPerfil(config, perfil, perfilID);

        // Usar la configuración en tu aplicación
    } catch (error) {
        console.error('Error cargando configuración:', error);
    }

}

function cargarLang(lang) {
    let confLang = "";
    if (lang === "es") {
        confLang = "conf/configES.json";
    } else if (lang === "en") {
        confLang = "conf/configEN.json";
    } else {
        confLang = "conf/configES.json";
    }

    return confLang;
}

async function cargarPerfil(cfg, data, imgID) {
    const descripcion = document.getElementsByClassName('descripcion')[0];
    const nombre = document.getElementsByClassName('nombre')[0];
    const emailCfg = document.getElementById('emailCfg');
    const img = document.getElementsByClassName('foto')[0];

    // Cargar datos básicos
    descripcion.textContent = data.descripcion;
    nombre.textContent = data.nombre;
    emailCfg.innerHTML = cfg.email + `<a href= "mailto:${data.email}"> ${data.email}</a>`;

    // Cargar imagen (primero PNG, luego JPG)
    try {
        const response = await fetch(`/${imgID}/${imgID}.png`);
        if (response.ok) {
            img.src = `/${imgID}/${imgID}.png`;
        } else {
            const jpgResponse = await fetch(`/${imgID}/${imgID}.jpg`);
            if (jpgResponse.ok) img.src = `/${imgID}/${imgID}.jpg`;
        }
    } catch (error) {
        console.error('Error cargando imagen:', error);
        img.src = 'placeholder.jpg'; // Imagen por defecto
    }

    
    // Seleccionar todos los td de la tabla
    const cells1 = document.querySelectorAll('.tabla-perfil td:nth-child(1)');
    const cells2 = document.querySelectorAll('.tabla-perfil td:nth-child(2)');  

    // Asignar valores desde el JSON
    cells1[0].textContent = cfg.color;
    cells1[1].textContent = cfg.libro;
    cells1[2].textContent = cfg.musica;
    cells1[3].textContent = cfg.video_juego;
    cells1[4].textContent = cfg.lenguajes;
    
    cells2[0].textContent = data.color;
    cells2[1].textContent = data.libro;
    cells2[2].textContent = data.musica;
    cells2[3].textContent = data.video_juego;
    cells2[4].innerHTML = `<strong>${data.lenguajes}</strong>`;
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarConfiguracion);