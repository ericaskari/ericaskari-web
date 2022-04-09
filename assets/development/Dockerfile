FROM nginx as Proxy

COPY ./assets/development/nginx.conf        /etc/nginx/nginx.conf
COPY ./assets/development/default.conf      /etc/nginx/conf.d/default.conf
COPY ./ssl.key      /ssl.key
COPY ./ssl.crt      /ssl.crt
