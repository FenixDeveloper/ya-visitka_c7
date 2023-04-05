FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev && npm i -g pm2
COPY --from=builder /app/dist ./dist/
COPY ./ecosystem.config.js .
EXPOSE 4000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]