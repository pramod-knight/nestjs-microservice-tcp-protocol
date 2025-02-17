import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { userResponseDto } from './dto/response-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)// before sending user data we omit password and all
  @MessagePattern('user.service.createUser')
  async create(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<userResponseDto> {
    const result = await this.usersService.create(createUserDto);
    return new userResponseDto(result);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('user.service.findAllUsers')
  async findAll(@Payload() data:{limit:number,pageNumber:number}) {
    const response = await this.usersService.findAll(data.limit,data.pageNumber);
    return {
      data: userResponseDto.fromArray(response.data),
      count:response.count
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('user.service.findOneById')
  async findOne(@Payload() data: {id:string}) {
    
    const result = await this.usersService.findOne(data.id);
    if(result){
      return new userResponseDto(result);
    }else{
      return null
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('user.service.findOneByEmail')
  async findOneByEmail(@Payload() data:{ email:string}) {
    const result = await this.usersService.findOneByEmail(data.email);
    if(result){
      return new userResponseDto(result);
    }else{
      return null
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('user.service.validateLogin')
  async validateLogin(@Payload() payload : LoginDto) {
    const result = await this.usersService.validateLogin(payload.email,payload.password);
    if(result){
      return new userResponseDto(result);
    }else{
      return null
    }
  }
}
