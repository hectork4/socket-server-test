

class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketsEvents();

    }

    socketsEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('a user connected ', socket.id );
          
            socket.emit('Bienvenido', socket.id)
          
            //listen events
            socket.on('mensaje', (data) => console.log(data))
          
            socket.on("mensaje-to-server", (datos) => {
              console.log(datos)
          
              this.io.emit("Mensaje-del-server", datos) //<== se utilizó io para que actualice todos los clientes, socket solo lo haría con uno
            })
        });
    }
}

module.exports = Sockets;