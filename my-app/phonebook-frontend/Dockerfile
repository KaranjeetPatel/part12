FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test


FROM test-stage AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM nginx:1.25-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html