FROM node:9-alpine

ENV TERM xterm

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh gcc musl-dev
  
RUN yarn global add preact-cli

EXPOSE 3000 3001 3002 80
