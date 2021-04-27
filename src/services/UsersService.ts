import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";

// não precisa interface pq sei que só recebe email
class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    };

    async create(email: string) {
        // verificar se o usuário existe
        const userExists = await this.usersRepository.findOne({email});
        
        // Se existir, retorna usuário
        if(userExists) return userExists;
        
        // Se não existir salvar no banco de dados
        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        // retorna o novo usuário
        return user;

    };

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        return user;
    }
};

export { UsersService };