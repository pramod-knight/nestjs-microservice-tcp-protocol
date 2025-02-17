import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception/exception.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  //Handle App exception
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  
  /**Swagger for APi setup */
  const config = new DocumentBuilder()
    .setTitle('API Swagger')
    .setDescription('The Gateway API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions =  {
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey
    };
  const documentFactory = () => SwaggerModule.createDocument(app, config,options);
  SwaggerModule.setup('api', app, documentFactory);
  const port = Number(process.env.GATEWAY_PORT)
  await app.listen(port,()=>{
    console.log(`API gateway listen at port : ${port}`)
  });
}
bootstrap();
