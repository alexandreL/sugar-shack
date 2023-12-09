import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service'
import { CreateUserDto } from '@sugar-shack/shared'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
