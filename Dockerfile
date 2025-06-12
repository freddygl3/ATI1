FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y apache2 python3 python3-pip libapache2-mod-wsgi-py3 git && \
    apt-get clean

# Configurar Apache
RUN a2enmod wsgi
COPY ./ATI.conf /etc/apache2/sites-available/
RUN a2ensite ATI.conf

# Instalar dependencias Python
WORKDIR /var/www/ATI
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copiar aplicación
COPY ./ /usr/local/apache2/htdocs/

# Permisos
RUN chown -R www-data:www-data /var/www/ATI && \
    chmod -R 755 /var/www/ATI

EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
