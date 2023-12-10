import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { EditProductDto, FilterProductDto } from '@sugar-shack/shared'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    create(@Body() createProductDto: EditProductDto) {
        return this.productService.create(createProductDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    findAll() {
        return this.productService.findAll()
    }

    @Get('filtered')
    foundWithFilter(@Query() filter: FilterProductDto) {
        return this.productService.findAllWithFilter(filter)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: EditProductDto,
    ) {
        return this.productService.update(+id, updateProductDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch(':id/refill')
    refillStock(@Param('id') id: string) {
        return this.productService.refillStock(+id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id)
    }
}
