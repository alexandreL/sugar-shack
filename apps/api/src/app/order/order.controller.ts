import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto } from '@sugar-shack/shared'
import { ApiSecurity } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Post()
    create(@Body() createOrderDto: OrderDto) {
        return this.orderService.create(createOrderDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Get()
    findAll() {
        return this.orderService.findAll()
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.orderService.findOne(uuid)
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Patch(':uuid')
    update(@Param('uuid') uuid: string, @Body() updateOrderDto: OrderDto) {
        return this.orderService.update(uuid, updateOrderDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Delete(':uuid')
    remove(@Param('uuid') uuid: string) {
        return this.orderService.remove(uuid)
    }
}
