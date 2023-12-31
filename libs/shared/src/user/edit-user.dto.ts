import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class EditUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string

    @IsString()
    @IsNotEmpty()
    firstName!: string
}
