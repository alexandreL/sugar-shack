import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { SyrupType } from '../enum/SyrupType'

export class OrderLineDto {
    @IsInt()
    @IsOptional()
    id?: number

    @IsInt()
    productId?: number

    @IsString()
    productName?: string

    @IsString()
    @IsOptional()
    productImage?: string

    @IsNumber()
    @IsOptional()
    productPrice?: number

    @IsInt()
    quantity?: number

    @IsEnum(SyrupType)
    @IsOptional()
    syrupType?: SyrupType
}
