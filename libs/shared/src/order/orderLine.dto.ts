import { IsEnum, IsInt, IsString } from 'class-validator'
import { SyrupType } from '../enum/SyrupType'

export class OrderLineDto {
    @IsInt()
    id?: number

    @IsString()
    productName?: string

    @IsString()
    productImage?: string

    @IsInt()
    productPrice?: number

    @IsInt()
    quantity?: number

    @IsEnum(SyrupType)
    syrupType?: SyrupType
}
