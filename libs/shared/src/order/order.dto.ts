import { IsEnum, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { OrderLineDto } from './orderLine.dto'
import { OrderStatus } from '../enum/OrderStatus'

export class OrderDto {
    @IsString()
    uuid?: string

    @IsString()
    customerName?: string

    @IsString()
    @IsNotEmpty()
    customerEmail?: string

    @IsInt()
    totalPrice?: number

    @IsEnum(OrderStatus)
    orderStatus?: OrderStatus

    @ValidateNested({ each: true })
    orderLines?: OrderLineDto[]
}
