import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    email?: string

    @Column()
    hashedPassword?: string
}
