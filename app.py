from beaker.middleware import SessionMiddleware
from wsgiref.simple_server import make_server
import json
import os

# Configuración de sesiones
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': True,
    'session.data_dir': '/tmp/sessions',
    'session.auto': True
}

def application(environ, start_response):
    # Manejo de sesión
    session = environ.get('beaker.session', {})
    
    # Obtener idioma de cookie o parámetro
    lang = session.get('lang', 'es')
    if 'lang' in environ.get('QUERY_STRING', ''):
        lang = environ['QUERY_STRING'].split('=')[1]
        session['lang'] = lang
        session.save()
    
    # Servir SPA
    if environ['PATH_INFO'] == '/':
        start_response('200 OK', [('Content-Type', 'text/html')])
        with open('/var/www/ATI/index.html') as f:
            return [f.read().encode()]
    
    # Endpoint API para perfiles
    elif environ['PATH_INFO'].startswith('/api/perfil/'):
        ci = environ['PATH_INFO'].split('/')[-1]
        try:
            with open(f'/var/www/ATI/{ci}/perfil.json') as f:
                perfil = json.load(f)
            start_response('200 OK', [('Content-Type', 'application/json')])
            return [json.dumps(perfil).encode()]
        except:
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'Perfil no encontrado']
    
    # Archivos estáticos
    else:
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'Recurso no encontrado']

# Aplicar middleware de sesiones
app = SessionMiddleware(application, session_opts)

if __name__ == '__main__':
    httpd = make_server('', 8000, app)
    httpd.serve_forever()