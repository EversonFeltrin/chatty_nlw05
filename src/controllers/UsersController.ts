import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UsersController {
    // retorna uma promise de response, outro retorno que n seja response dá erro
    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const usersService = new UsersService();

        const user = await usersService.create(email);

        return response.json(user);
    };
};

export { UsersController };