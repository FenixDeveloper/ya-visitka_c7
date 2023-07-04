FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest AS frontend
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/conf.d/default.conf /etc/nginx/conf.d
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
