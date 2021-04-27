import { Router}  from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';
import { MessagesController } from './controllers/MessagesController';

const routes = Router();
/**
 * GET = Buscas
 * POST = Creiação
 * PUT =  Alteração
 * DELETE = DEletar
 * PATCH = Alterar uma informação específica
 */
/**
 * Tipos de parametros
 * Routes params -> parametros de rotas
 * http://localhost:3333/1
 * 
 * Query params => filtros e buscas
 * http://localhost:3333/1?search=example
 * 
 * Body params => repassar objetos dentro da requisição {...}
 */

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post('/settings', settingsController.create);
routes.get('/settings/:username', settingsController.findByUsername);
routes.put('/settings/:username', settingsController.update);

routes.post('/users', usersController.create);

routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByUser);


export { routes };