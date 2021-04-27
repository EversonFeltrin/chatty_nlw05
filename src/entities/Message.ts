import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('messages')
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    // se considerar como coluna, o banco de dados verifica se o id existe, senão dá erro
    // outra abordagem => colocar o objeto dentro da classe, representação do objeto
    @JoinColumn({ name: "user_id" }) // vai estar fazendo join com a coluna user_id
    @ManyToOne(() => User) // define o tipo usuário
    user: User

    @Column()
    user_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) this.id =  uuid();
    };
};

export { Message };
