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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

