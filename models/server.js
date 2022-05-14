const express       = require('express');
const socketio      = require("socket.io");
const http          = require('http');
const path          = require('path');
const Sockets       = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //configuraciones del socket
        this.io = socketio(this.server, { /* Configuraciones */});
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    socketConfigs() {
        new Sockets( this.io );
    }

    execute() {

        //inicializar middlewere
        this.middlewares();

        this.socketConfigs();

        //inicializar server
        this.server.listen(this.port, () => {
            console.log(`listening on *:${this.port}`);
        });
    }
 
}

module.exports = Server