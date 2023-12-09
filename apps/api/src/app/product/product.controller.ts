import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { EditProductDto } from '@sugar-shack/shared'
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

    @Get()
    findAll() {
        return this.productService.findAll()
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
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id)
    }
}
