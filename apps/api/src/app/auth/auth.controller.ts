import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthUserDto } from '@sugar-shack/shared'
import { LocalAuthGuard } from './local-auth.guard'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any, @Body() authUserDto: AuthUserDto) {
        return this.authService.login(req.user)
    }
}
