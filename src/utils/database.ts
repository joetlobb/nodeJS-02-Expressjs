import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;