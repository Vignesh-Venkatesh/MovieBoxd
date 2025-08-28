# building the vite app using bun
FROM oven/bun:1 AS build

# setting the working directory
WORKDIR /app

# accept build-time argument for Vite
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# copying dependency files and installing them
COPY package.json bun.lock ./
RUN bun install

# copying frontend source code
COPY . .

# building the Vite project into static files (dist/)
RUN bun run build



# stage 2: serving static files with nginx
FROM nginx:alpine

# copying the built static files from the build stage into nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80 (HTTP)
EXPOSE 80

# start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]