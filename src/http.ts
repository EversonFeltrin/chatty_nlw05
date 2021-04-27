import express from "express";
import "./database"; // JS importa por padrão assim o index, já criando a conexão nesse caso
import { routes } from './routes';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
});

const http = createServer(app); // criando o protocolo http
const io = new Server(http); // criando protocolo WS
// Trabalhar sobre o mesmo servidor, mas iremos separar em dois arquivos um pra atendente e outro pra usuário

io.on("connection", (socket: Socket) => {
    console.log('Se conectou', socket.id);

});

app.use(express.json());

app.use(routes);


export {
    http,
    io
};