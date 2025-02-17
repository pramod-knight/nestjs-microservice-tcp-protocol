## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript is used to build this repository.

## Clone the repository 

## Project setup

## 1 Go to gateway folder

```bash
$ cd  ./gateway
```
## 1.1 Install dependency
```bash
$ pnpm install
```

## 1.2 Compile and run the gateway service

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 2 Go to user-services folder

```bash
$ cd  ./user-services
```
## 1.1 Install dependency
```bash
$ pnpm install
```

## 1.2 Compile and run the gateway service

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 3 Open browser at http://localhost:PORT/api/ (Swagger documentation available to test API end point)

## When you run by docker
create a .env file in root folder
copy all variable from en-sample

Run the following command

```bash
$ docker compose -f ./docker-compose-dev.yaml build
$ docker compose -f ./docker-compose-dev.yaml up
```

make sure docker is install in your local machine and docker service is start

