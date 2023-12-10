import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { OrderLineDto } from './orderLine.dto'
import { OrderStatus } from '../enum/OrderStatus'

export class OrderDto {
    @IsString()
    @IsOptional()
    uuid?: string

    @IsString()
    customerName?: string

    @IsString()
    @IsNotEmpty()
    customerEmail?: string

    @IsNumber()
    totalPrice?: number

    @IsEnum(OrderStatus)
    @IsOptional()
    orderStatus?: OrderStatus

    @ValidateNested({ each: true })
    orderLines?: OrderLineDto[]
}
