import { SyrupType } from '../enum/SyrupType'
import { IsEnum, IsInt, IsString } from 'class-validator'

export class EditProductDto {
    @IsInt()
    id?: number

    @IsString()
    name?: string

    @IsString()
    description?: string

    @IsString()
    image?: string

    @IsInt()
    price?: number

    @IsInt()
    stock?: number

    @IsInt()
    maxStock?: number

    @IsEnum(SyrupType)
    syrupType?: SyrupType
}