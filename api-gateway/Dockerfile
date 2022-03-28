FROM node:latest
COPY . .
RUN npm install
RUN npx tsc
ENTRYPOINT [ "npm" , "start" ]