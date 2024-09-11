import 'dotenv/config'; 


// Definición de la interfaz IEnv que describe la estructura de las variables de entorno
interface IEnv {
    PORT: string | undefined; 
    HOST: string | undefined;
    USER: string | undefined; 
    PASSWORD: string | undefined; 
    NAME: string | undefined; 
    DIALECT: string | undefined; 
}

// Objeto env que almacena los valores de las variables de entorno
const env: IEnv = {
    PORT: process.env.PORT, 
    HOST: process.env.HOST, 
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD, 
    NAME: process.env.NAME, 
    DIALECT: process.env.DIALECT 
};

export default env; 
