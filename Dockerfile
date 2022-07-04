FROM node:lts-bullseye
WORKDIR /app
RUN apt update -y && apt upgrade -y \
    && apt install -y --no-install-recommends git \
    && apt autoclean -y \
    && apt autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm \
    && git clone --depth=1 https://github.com/zyachel/quetre.git . \
    && pnpm install
EXPOSE 3000
CMD ["pnpm", "start"]
