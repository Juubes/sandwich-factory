FROM node:latest
WORKDIR /app
COPY . .
RUN npm ci
RUN npx tsc
ENTRYPOINT [ "npm" , "start" ]