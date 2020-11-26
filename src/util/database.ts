import mysql from 'mysql2';

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'nodeshop',
	password: 'password'
});

export default pool.promise();
