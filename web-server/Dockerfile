FROM node:latest
COPY . .
RUN yarn build
ENTRYPOINT [ "yarn" , "start" ]
# TODO Optimisation for a better web server -- multistage docker building?