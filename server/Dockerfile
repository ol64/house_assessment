FROM node:18-slim

WORKDIR /house_exercise

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD yarn start