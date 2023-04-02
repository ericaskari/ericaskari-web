FROM node:lts-gallium

WORKDIR /app

COPY dist/apps/root-api .
COPY .github/Backend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN npm install

HEALTHCHECK CMD curl --fail http://localhost:8000/api || exit 1

ARG APP_BUILD_VERSION=local-development
ENV APP_BUILD_VERSION=$APP_BUILD_VERSION
ENV TZ=utc

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "node", "/app/main.js" ]

EXPOSE 8000
