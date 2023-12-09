import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { verify } from 'argon2'
import { PublicUserDto } from '@sugar-shack/shared'

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email)
        if (user && user.hashedPassword && await verify(user.hashedPassword, pass)) {
            const { hashedPassword, ...result } = user
            return result
        }
        return null
    }

    async login(user: PublicUserDto) {
        const payload = { email: user.email, sub: user.id, firstName: user.firstName }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
