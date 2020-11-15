# Create the container from the alpine linux image
# FROM nginx:stable-alpine

# build stage
FROM node:lts-alpine as build-stage
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# # Create the directories we will need
# RUN mkdir -p /tmp/nginx/vue-single-page-app
# RUN mkdir -p /var/log/nginx
# RUN mkdir -p /var/www/html

# # Copy the respective nginx configuration files
# COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
# COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# # Set the directory we want to run the next commands for
# WORKDIR /tmp/nginx/vue-single-page-app
# # Copy our source code into the container
# COPY package*.json ./

# COPY . .
# # Install the dependencies, can be commented out if you're running the same node version


# # run webpack and the vue-loader
# RUN npm run build

# # copy the built app to our served directory
# RUN cp -r dist/* /var/www/html

# # make all files belong to the nginx user
# RUN chown nginx:nginx /var/www/html

# # start nginx and keep the process from backgrounding and the container from quitting
# CMD ["nginx", "-g", "daemon off;"]
