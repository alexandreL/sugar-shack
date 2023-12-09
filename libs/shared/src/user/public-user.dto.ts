import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class PublicUserDto {
    @IsInt()
    id?: number

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    firstName?: string
}
