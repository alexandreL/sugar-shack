import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email

    @IsString()
    @IsNotEmpty()
    password

    @IsString()
    @IsNotEmpty()
    firstName

    constructor() {
        this.email = ''
        this.password = ''
        this.firstName = ''
    }
}
