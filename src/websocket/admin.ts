import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    // emite a todos que estão ouvindo, o socket seria do usuário, n usa o socket -> socket.emit
    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

    socket.on('admin_list_messages_by_user', async (params, callBack) => {
        const { user_id } = params;

        const allMessages= await messagesService.listByUser(user_id)

        callBack(allMessages)
    })

    socket.on('admin_send_message', async (params) => {
        const { user_id, text } = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        // dentro do connectionsService temos  as informações do usuário, pelo id do usuário conseguimos a info do id do socket
        const { socket_id } = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit('admin_send_to_client', {
            text, // texto do atendente
            socket_id: socket.id // socket do admin
        });
    });

    socket.on('admin_user_in_support', async (params) => {
        const { user_id } = params;

        await connectionsService.updateAdminID(user_id, socket.id);

        io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
    });
});