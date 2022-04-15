FROM node as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
ENTRYPOINT ["npm", "start"]
