FROM node as build
WORKDIR /app
COPY . .
RUN yarn build
RUN npx next export

FROM nginx
COPY --from=build /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf