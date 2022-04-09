FROM node:lts-gallium

WORKDIR /app

COPY _dist/App.Api .
COPY _ci/Backend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN npm install

HEALTHCHECK CMD curl --fail http://localhost:8000/api/healthcheck || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "node", "/app/main.js" ]

EXPOSE 8000
