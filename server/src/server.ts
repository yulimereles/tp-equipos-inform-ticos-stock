import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './environments/environments';
import routesEquipos from '../src/routes/equipment';
import routesUser from '../src/routes/user';
import dbConnection from './db/db';



export class Server {
   private app: express.Application; 
   private port: string;
   private host: string;

    constructor(){
        this.app = express()
        this.port = env.PORT || '3001';
        this.host = env.HOST || 'localhost';
        this.dbConnect()
        this.listen();
        this.midlewares();
        this.routes();
    }

    async dbConnect(): Promise<void>{
        await dbConnection();
    }

    listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto: ${this.port}`);
        })
    }

    routes(){
        this.app.use('/api/equipos', routesEquipos )
        this.app.use('/api', routesUser)
    }


    midlewares(): void{
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

}
