FROM node:18-alpine
WORKDIR /app
RUN apk add --update --no-cache git openssh \
    && npm install -g pnpm \
    && git clone --depth=1 https://github.com/zyachel/quetre.git . \
    && pnpm install
EXPOSE 3000
CMD ["pnpm", "start"]
