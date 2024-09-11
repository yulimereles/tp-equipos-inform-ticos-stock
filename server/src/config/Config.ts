import 'dotenv/config';

const env = {
    PORT: process.env.PORT!,
    HOST: process.env.HOST,

    DB: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        NAME: process.env.DB_NAME,
        DIALECT: process.env.DB_DIALECT
    }
}
export default env; 