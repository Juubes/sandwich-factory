FROM node:latest
COPY . .
RUN npm install
ENTRYPOINT [ "npm" , "start" ]
LABEL name="ggg"
ENV ORDER_API_URL=https://localhost:3531/