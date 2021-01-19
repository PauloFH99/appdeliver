import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcryptjs from 'bcryptjs'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    cep: string;

    @Column()
    cpf: string;

    @Column()
    rua: string;

    @Column()
    numero: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    apelido: string;

    @Column()
    password?: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcryptjs.hashSync(this.password ? this.password : '', 8);
    }
}

export default User;