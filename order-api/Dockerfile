FROM node as build
COPY . .
EXPOSE 3531
RUN npm install
ENTRYPOINT ["npm", "start"]
