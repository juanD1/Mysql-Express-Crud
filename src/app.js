//Dependencies
const path = require('path')

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

//Conecction
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const config = require('./libs/config')
const dbOptions = {
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.db,
			port: config.database.port
		}
const conn = myConnection(mysql, dbOptions, 'request');

//Assets
const favicon = require('serve-favicon') (`${__dirname}/public/favicon.png`)
const publicDir = express.static(`${__dirname}/public`)  

const app = express()

const indexRoutes = require('./routes/')

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views' ))
app.set('view engine', 'pug')

//Middlewares
app.use(logger('dev'))
app.use(express.json())
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )
app.use( publicDir )
app.use( favicon )

//Connection
app.use(conn)

//Routes
app.use('/', indexRoutes.list)


// app.use((req, res, next) => {
//   let err = new Error();
// 	err.status = 404;
// 	err.statusText = 'NOT FOUND';

// 	res.render('error', {error: err});
// });


app.listen(app.get('port'), () => {
	console.log('server Crud-MySQL-express on port ', app.get('port'))
})
