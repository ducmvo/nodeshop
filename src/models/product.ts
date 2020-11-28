import Sequelize, { Model } from 'sequelize';

import sequelize from '../util/database';

export interface IProduct {
	id?: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

class Product extends Model<IProduct> {
	public id!: number;
	public title!: string;
	public price!: number;
	public description!: string;
	public image!: string;
}

Product.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: Sequelize.STRING,
		price: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},

		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		image: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'products',
		sequelize
	}
);

export default Product;
