# Build stage
FROM node:18 AS build

WORKDIR /app


COPY package.json yarn.lock ./
COPY packages/app/package.json ./packages/app/
COPY packages/tests/package.json ./packages/tests/

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn workspace app build


FROM node:18-alpine


WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/packages/app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"] 