FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc
ENTRYPOINT [ "npm" , "start" ]