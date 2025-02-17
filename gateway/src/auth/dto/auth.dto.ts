import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        name:"email",
        type:String
    })
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty({
        name:"password",
        type:String
    })
    @IsNotEmpty()
    @IsString()
    password:string
}