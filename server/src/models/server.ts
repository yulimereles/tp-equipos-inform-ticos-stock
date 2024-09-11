import express from 'express';
import env from '../environments/environments'


export class Server {
   private app: express.Application; 
   private port: string;

    constructor(){
        this.app = express()
        this.port = env.PORT || '3001';
        this.listen();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto'  + this.port);
        })
    }
}
