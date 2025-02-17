import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    //load config module and enable .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    // connect Mongodb forRoot method is like connect method
    MongooseModule.forRoot(`${process.env.USER_SERVICE_MONGO_URL}`),
    UsersModule,
  ],
})
export class AppModule {}
