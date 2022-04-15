FROM node as build
COPY . .
RUN yarn install --frozen-lockfile
ENTRYPOINT ["npm", "start"]
