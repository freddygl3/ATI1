# Utiliza la imagen oficial de Apache basada en Ubuntu
FROM httpd:2.4

# Mantener el sistema actualizado
RUN apt-get update && apt-get upgrade -y

# Copiar todo el contenido del proyecto al directorio de documentos de Apache
COPY ./ /usr/local/apache2/htdocs/

# Exponer el puerto HTTP
EXPOSE 80
