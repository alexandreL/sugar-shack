import { IsEnum, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { OrderLineDto } from './orderLine.dto'
import { OrderStatus } from '../enum/OrderStatus'

export class OrderDto {
    @IsInt()
    id?: number

    @IsString()
    customerName?: string

    @IsString()
    @IsNotEmpty()
    customerEmail?: string

    @IsEnum(OrderStatus)
    orderStatus?: OrderStatus

    @ValidateNested({ each: true })
    orderLines?: OrderLineDto[]
}
