FROM node:22.14.0-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine3.20 AS final
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html/
COPY --from=build  /src/dist/my-site/browser .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
