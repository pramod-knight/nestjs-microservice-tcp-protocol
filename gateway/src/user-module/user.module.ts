import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports:[
    ClientsModule.registerAsync([
      {
        imports:[ConfigModule],
        name:'USER_SERVICE',
        useFactory:async (configService:ConfigService)=>({
            transport:Transport.TCP,
            options:{
            host:configService.get<string>('userServiceHost'),
            port:configService.get<number>('userServicePort')
          }
        }),
        inject:[ConfigService]
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
