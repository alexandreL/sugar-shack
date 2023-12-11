FROM sugar-shack:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx run marketplace:build ${BUILD_FLAG}

FROM sugar-shack:nx-base

WORKDIR /app
COPY --from=builder /app/builder/apps/marketplace/.output ./

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", "./server/index.mjs" ]
