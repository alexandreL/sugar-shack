import { SyrupType } from '../enum/SyrupType'
import { IsEnum, IsInt, IsString } from 'class-validator'

export class SmallProductDto {
    @IsInt()
    id?: number

    @IsString()
    name?: string

    @IsString()
    image?: string

    @IsInt()
    price?: number

    @IsInt()
    stock?: number

    @IsEnum(SyrupType)
    syrupType?: SyrupType
}
