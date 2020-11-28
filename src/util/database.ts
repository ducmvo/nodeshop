import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodeshop', 'root', 'password', {
	dialect: 'mysql',
	host: 'localhost'
});

export default sequelize;
