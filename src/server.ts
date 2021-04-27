import { http } from './http';
import './websocket/client';
import './websocket/admin';

// instalação beekeper -> https://www.edivaldobrito.com.br/como-instalar-o-beekeeper-studio-no-linux-via-appimage/#:~:text=Beekeeper%20Studio%20%C3%A9%20um%20editor,publicado%20sob%20licen%C3%A7a%20do%20MIT.
// app.listen(3333, () => console.log('Server is running on port 3333'));
// sobe o express e o io
http.listen(3333, () => console.log('Server is running on port 3333'));
