FROM node:13

WORKDIR /usr/src/google-api-proxy 
COPY package*.json ./

RUN npm ci --only=production

COPY . . 
RUN npm run build

EXPOSE 3000
CMD [ "node", "./dist/server.js"]