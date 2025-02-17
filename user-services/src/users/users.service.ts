import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument, UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { error } from 'console';

const salt = 10;
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<userDocument>,
  ) {}

  async create(payload: CreateUserDto): Promise<userDocument> {
    const createdUser = new this.userModel(payload);

    //create hash password
    const hash = bcrypt.hashSync(payload.password, salt);
    createdUser.password = hash;
    this.logger.log('Creating a new user.');
    const result = await createdUser.save();
    this.logger.log('New user created.');
    return result;
  }

  async findAll(limit:number,pageNUmber:number):Promise<{data:userDocument[] | [],count:number}> {
    
    const [result,count] =await Promise.all([
      
       this.userModel.find({}),
       this.userModel.countDocuments({}) 
      
    ]);
    return {
      data:result,
      count:count
    }
  }

  findOne(id: string):Promise<userDocument | null> {
    return this.userModel.findById(id);
  }

  findOneByEmail(email: string):Promise<userDocument | null> {
    return this.userModel.findOne({email});
  }

  async validateLogin(email: string,password:string):Promise<userDocument | null> {
    const result= await this.userModel.findOne({email});
    if(!result){
      throw new NotFoundException("User account not exits");
    };

    const isMatched = bcrypt.compareSync(password,result.password);
    if(!isMatched){
      throw new NotFoundException("Invalid username or password");
    };
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
