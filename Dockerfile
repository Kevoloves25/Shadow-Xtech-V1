
FROM node:lts-buster
RUN git clone https://github.com/Tappy-Black/Shadow-Xtech/root/tappyblack
WORKDIR /root/tappyblack
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
