import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';


class MessagesController {
    async create(request: Request, response: Response) {
        const { admin_id, text, user_id } = request.body;

        const messagesService = new MessagesService();

        // regra: quando admin_id === null mensagem do usuário, quando admin_id !== null resposta do atendente
        const message = await messagesService.create({
            admin_id,
            text,
            user_id
        });

        return response.json(message);
    };

    // localhost:3333/messages/:idDousuario
    async showByUser(request: Request, response: Response) {
        const { id } = request.params;

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(id);

        return response.json(list);
    }
};

export { MessagesController };