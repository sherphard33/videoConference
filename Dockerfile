FROM node:12

WORKDIR /usr/src/meetings

COPY package*.json ./

RUN npm install

RUN npm install request --save

COPY . .

EXPOSE 8081

EXPOSE 4443

CMD ["npm", "start"]