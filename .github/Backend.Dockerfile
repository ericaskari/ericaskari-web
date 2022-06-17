FROM node:lts-gallium

WORKDIR /app

COPY _dist/api .
COPY .github/Backend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN npm install

HEALTHCHECK CMD curl --fail http://localhost:8000/api/healthcheck || exit 1

ARG BUILD_VERSION=local-development
ENV BUILD_VERSION=$BUILD_VERSION

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "node", "/app/main.js" ]

EXPOSE 8000
