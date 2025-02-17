import {
    Catch,
    ArgumentsHost,
    Inject,
    HttpServer,
    HttpStatus,
  } from '@nestjs/common';
  import { BaseExceptionFilter } from '@nestjs/core';
  import { RpcException } from '@nestjs/microservices';
  // import { QueryFailedError } from 'typeorm';
  
  /**
   * Here we are handle all exception and configure
   *
   * return the error object with custom error message
   *
   */
  @Catch()
  export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(@Inject() applicationRef: HttpServer) {
      super(applicationRef);
    }
  
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    catch(exception: any, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      // const request = ctx.getRequest();
      // const status = exception.getStatus();
      console.log('Exception--->', exception);
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('Exception--->', exception);
      // }
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
  
      let message = exception?.message;
      let error = exception?.response ? exception?.response : exception?.error;
  
      if (exception?.code === 11000) {
        (message = 'Duplicate Entry'), (error = exception?.keyValue);
      }
  
      if (exception.status === HttpStatus.NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
  
      if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
      }
  
      if (exception.status === HttpStatus.NOT_ACCEPTABLE) {
        status = HttpStatus.NOT_ACCEPTABLE;
      }
  
      if (exception.status === HttpStatus.EXPECTATION_FAILED) {
        status = HttpStatus.EXPECTATION_FAILED;
      }
  
      if (exception.status === HttpStatus.BAD_REQUEST) {
        status = HttpStatus.BAD_REQUEST;
        message = "Bad Request"
      }
      if (exception.status === HttpStatus.UNAUTHORIZED) {
        status = HttpStatus.UNAUTHORIZED;
        message = "UnAuthorized access"
      }
      if (exception.status === HttpStatus.FORBIDDEN) {
        status = HttpStatus.FORBIDDEN;
        message = "Resource access denied."
      }
  
      /* Here the response is bind with our custom response object */
      response.status(status).json({
        statusCode: status,
        error: error,
        message: message,
        data:null
      });
    }
  }