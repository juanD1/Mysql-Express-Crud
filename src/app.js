//Dependencies
const path = require('path')

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
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
app.use( bodyParser.urlencoded({ extended: false }) )
// app.use( bodyParser.json() )
app.use( publicDir )
app.use( favicon )

// app.use( conn )

//Routes
app.use('/',indexRoutes)


// app.use((req, res, next) => {
//   let err = new Error();
// 	err.status = 404;
// 	err.statusText = 'NOT FOUND';

// 	res.render('error', {error: err});
// });


app.listen(app.get('port'), () => {
	console.log('server Crud-MySQL-express on port ', app.get('port'))
})
