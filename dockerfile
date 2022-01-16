FROM frapsoft/openssl AS keygen
WORKDIR /app
COPY scripts/generateKeys.sh ./
RUN sh generateKeys.sh

FROM node:lts-alpine3.14 AS builder
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma/
COPY .env.docker ./.env
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine3.14 AS server
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY --from=keygen ./app/key.pem ./
COPY --from=keygen ./app/public.pem ./
COPY --from=builder ./app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
RUN npm run generate
EXPOSE 8000
CMD ["npm", "start"]
