export class CreateUserDto {
    email
    password
    firstName

    constructor() {
        this.email = ''
        this.password = ''
        this.firstName = ''
    }
}
