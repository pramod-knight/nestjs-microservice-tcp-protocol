import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/user.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({status:201,description:'Documents created'})
  @ApiResponse({status:401,description:'Authorization token required'})
  @ApiResponse({status:400,description:'Validation failed'})
  @ApiResponse({status:403,description:'Resource access denied'})
  @ApiResponse({status:500,description:'Resource not available'})
  @Post()
  create(@Body() createUserModuleDto: CreateDto, @Req() req) {
    // console.log(req.user)
    return this.userService.create(createUserModuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({status:200,description:'Records fetched successfully'})
  @ApiResponse({status:401,description:'Authorization token required'})
  @ApiResponse({status:400,description:'Validation failed'})
  @ApiResponse({status:403,description:'Resource access denied'})
  @ApiResponse({status:500,description:'Resource not available'})
  @Get('/list')
  findAll(@Query('limit') limit:number,@Query('page') pageNumber:number,@Req() req) {
    console.log(req.user)
    return this.userService.findAll(limit,pageNumber);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({status:200,description:'Records fetched successfully'})
  @ApiResponse({status:401,description:'Authorization token required'})
  @ApiResponse({status:400,description:'Validation failed'})
  @ApiResponse({status:403,description:'Resource access denied'})
  @ApiResponse({status:500,description:'Resource not available'})
  @Get('/detail/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
