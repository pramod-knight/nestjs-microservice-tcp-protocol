import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
export class CreateDto {
  @ApiProperty({
    name:'first_name',
    required:true
  })
    @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    name:'last_name',
    required:true
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    name:'email',
    required:true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name:'password',
    required:true
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
