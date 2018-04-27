module.exports = function Connection(){
	const mysql = require('mysql'),
		myConnection = require('express-myconnection'),
		dbOptions = {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'indentation_war',
			port: 3306
		},
		conn = myConnection(mysql, dbOptions, 'request');

		return conn
} 

