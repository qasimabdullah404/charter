FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
ENV PREFER_IPV4=1
ENV ADDRCONFIG=1
CMD [ "node", "index.js" ]