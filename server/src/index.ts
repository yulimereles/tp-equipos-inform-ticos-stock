import {Server} from './server';
import dotenv from 'dotenv';


//configuro dotenv 
dotenv.config();

const server = new Server();
server.listen();