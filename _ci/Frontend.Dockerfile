FROM nginx:1.21.4

WORKDIR /usr/share/nginx/html

COPY _dist/App.Web .
COPY _ci/Frontend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY ./_ci/Frontend.conf.template /etc/nginx/templates/default.conf.template

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
