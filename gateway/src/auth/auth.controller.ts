import { Controller, Post, Body} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}
  @ApiResponse({status:200,description:'User login success'})
  @ApiResponse({status:401,description:'User is invalid'})
  @ApiResponse({status:400,description:'Validation failed'})
  @ApiResponse({status:403,description:'Resource access denied'})
  @ApiResponse({status:500,description:'Resource not available'})
  @Post('/login')
  create(@Body() payload: LoginDto) {
   return this.authService.login(payload)
  }

}
