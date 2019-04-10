FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm build
RUN npm update
RUN  npm install
EXPOSE 3000
CMD [ "npm", "start" ]
