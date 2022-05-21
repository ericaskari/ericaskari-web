FROM nginx:1.21.4

WORKDIR /usr/share/nginx/html

COPY _dist/App.Web .
COPY .github/Frontend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY ./.github/Frontend.conf.template /etc/nginx/templates/default.conf.template

ARG BUILD_VERSION=local-development
ENV BUILD_VERSION=$BUILD_VERSION

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
