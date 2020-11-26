# # build environment
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent
# # RUN npm install @vue/cli-g
# COPY . /app
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:14 as dev

WORKDIR /src

COPY package.json /src/package.json
RUN npm install
COPY . .

RUN npm build

FROM nginx:alpine
COPY --from=dev /src/dist /usr/share/nginx/html
EXPOSE 80