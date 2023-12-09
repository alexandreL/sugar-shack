import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from '../user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@sugar-shack/entity'
import { AuthController } from './auth.controller'


@Module({
    imports: [
        TypeOrmModule.forFeature([ User ]),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ AuthController ],
    providers: [ UserService, AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule {
}
