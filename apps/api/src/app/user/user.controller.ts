import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { EditUserDto } from '@sugar-shack/shared'
import { ApiSecurity } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Post()
    create(@Body() createUserDto: EditUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: EditUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
