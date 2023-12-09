import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class PublicUserDto {
    @IsInt()
    id

    @IsEmail()
    @IsNotEmpty()
    email

    @IsString()
    firstName

    constructor() {
        this.email = ''
        this.firstName = ''
        this.id = 0
    }
}
