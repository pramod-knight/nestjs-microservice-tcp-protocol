import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user-module/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private jwtService: JwtService){}
  async login(payload: LoginDto) {
    const validateUser = await this.userService.validateLogin(payload.email,payload.password);
    
    /** Create a token for user */
    const sub = { id: validateUser.id, email: validateUser.email };
    
    return {
      access_token: await this.jwtService.signAsync(sub,{secret:process.env.JWT_SECRET}),
    };
  }
}
