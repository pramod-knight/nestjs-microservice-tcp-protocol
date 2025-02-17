import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BadRequestException, ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './exception/exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: `${process.env.USER_SERVICE_HOST}`,
        port: Number(process.env.USER_SERVICE_PORT),
      },
      logger: new ConsoleLogger({
        colors: true,
        prefix: 'MicroService-User',
      }),
    },
  );
  //Handle Dto Class-validation Error
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      whitelist: true,
      forbidNonWhitelisted: true, // Optional: If you want to throw an error when unknown properties are provided
      transform: true,
      //The exceptionFactory helps us to control the error message and here we manage message into object from string
      // default the error message will be in array of string
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] = error.constraints && Object.values(error.constraints)
            .join('. ')
            .trim();
        });
        return new BadRequestException(errorMessages);
      },
      
    }),
  );

  // Apply the exception filter globally
  app.useGlobalFilters(new ExceptionFilter())
  await app.listen();
  console.log(`User Service started host:- http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`)

}
bootstrap();
