FROM node as build
WORKDIR /app
COPY . .
RUN npm ci
ENTRYPOINT ["npm", "start"]
