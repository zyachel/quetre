FROM node:alpine3.17
WORKDIR /app

RUN apk update && apk add git   
RUN git clone https://github.com/zyachel/quetre .
RUN npm i -g pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start"]