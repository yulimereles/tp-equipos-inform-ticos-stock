import { Sequelize } from 'sequelize';
import env from '../environments/environments';

const sequelize = new Sequelize(env.NAME!, env.USER!, env.PASSWORD!, {
  host: env.HOST!,
  dialect: env.DIALECT as any
});

export default sequelize;
