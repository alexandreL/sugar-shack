import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@sugar-shack/shared'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@sugar-shack/entity'
import { Repository } from 'typeorm'
import { hash } from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await hash(createUserDto.password)
        return this.usersRepository.save(this.usersRepository.create({ ...createUserDto, hashedPassword }))
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email })
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id })
    }

    update(id: number, updateUserDto: CreateUserDto) {
        return this.usersRepository.update(id, updateUserDto)
    }

    remove(id: number) {
        return this.usersRepository.delete(id)
    }
}
