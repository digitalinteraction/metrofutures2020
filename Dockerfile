FROM node:16-alpine AS base
RUN mkdir -p /app \
  && apk add --no-cache tini \
  && chown -R node:node /app
USER node
COPY --chown=node:node ["package*.json", "server.js", "/app/"]
WORKDIR /app

FROM base AS builder
COPY [".", "/app/"]
ENV VUE_APP_API_URL= VUE_APP_TILE_URL=https://metrofutures.ams3.digitaloceanspaces.com/tiles/
RUN npm ci
RUN npm run build

FROM base AS server
COPY --from=builder --chown=node:node ["/app/dist", "/app/dist"]
COPY --chown=node:node ["api", "/app/api"]
ENV NODE_ENV=production
RUN npm install express@4 cors@2 morgan@1
ENTRYPOINT ["tini", "--", "node"]
CMD [ "server.js" ]