FROM node:20

WORKDIR /app

COPY . .

RUN yarn

RUN npx prisma generate

RUN yarn build

CMD npx prisma migrate deploy && yarn start:prod
