FROM node as build
COPY . .
RUN yarn build
RUN npx next export


FROM nginx
COPY --from=build ./out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf