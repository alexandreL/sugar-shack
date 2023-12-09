import { IsEnum, IsInt, IsString } from 'class-validator'
import { SyrupType } from '../enum/SyrupType'

export class OrderLineDto {
    @IsInt()
    id?: number

    @IsString()
    ProductName?: string

    @IsString()
    ProductImage?: string

    @IsInt()
    productPrice?: number

    @IsInt()
    quantity?: number

    @IsEnum(SyrupType)
    syrupType?: SyrupType
}
