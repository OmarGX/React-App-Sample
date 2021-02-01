#STAGE 1
FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin$PATH

COPY package.json app/package.json
RUN npm install
RUN npm install react-scripts@4.0.1 -g

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]