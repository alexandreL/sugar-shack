import { SyrupType } from '../enum/SyrupType'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class SmallProductDto {
    @IsInt()
    id?: number

    @IsString()
    name?: string

    @IsString()
    @IsOptional()
    image?: string

    @IsNumber()
    price?: number

    @IsInt()
    stock?: number

    @IsInt()
    maxStock?: number

    @IsEnum(SyrupType)
    syrupType?: SyrupType
}
