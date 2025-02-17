import { Inject, Injectable } from '@nestjs/common';
import { CreateDto } from './dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import {firstValueFrom} from "rxjs"

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_SERVICE') private client:ClientProxy,
  ){}

  async create(createUserModuleDto: CreateDto) {
    let payload = createUserModuleDto;
    const pattern={cmd:'user.service.createUser'};

    const result = await firstValueFrom(this.client.send(pattern.cmd,payload))
    return result
  }

  async findAll(limit:number,pageNumber:number) {
    const pattern = {cmd:'user.service.findAllUsers'};
    const result = await firstValueFrom(this.client.send(pattern.cmd,{limit,pageNumber}))
    return result
  }

  async findOne(id: string) {
    const pattern = {cmd:'user.service.findOneById'};
    const result = await firstValueFrom(this.client.send(pattern.cmd,{id}))
    return result
  }

  async findByEmail(email: string) {
    const pattern = {cmd:'user.service.findOneByEmail'};
    const result = await firstValueFrom(this.client.send(pattern.cmd,{email}));
    return result
  }

  async validateLogin(email: string,password:string) {
    const pattern = {cmd:'user.service.validateLogin'};
    const result = await firstValueFrom(this.client.send(pattern.cmd,{email,password}));
    return result
  } 

  remove(id: number) {
    return `This action removes a #${id} userModule`;
  }
}
