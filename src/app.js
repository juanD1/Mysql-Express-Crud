'use strict'
//Dependencies
const express = require('express'),
      pug = require('pug'),
      bodyParser = require('body-parser'),
      favicon = require('serve-favicon') (`${__dirname}/public/favicon.png`),
      publicDir = express.static(`${__dirname}/public`),
      viewDir = `${__dirname}/views`,
      port = (process.env.PORT || 3000)     

const app = express(),
			indexRoutes = require('./routes/')

//Settings
app.set( 'views', viewDir)
app.set( 'view engine', 'pug')
app.set( 'port', port)

//Middlewares
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( publicDir )
app.use( favicon )

app.use( conn )

//Routes
app.use('/',indexRoutes)


app.use((req, res, next) => {
  let err = new Error();
	err.status = 404;
	err.statusText = 'NOT FOUND';

	res.render('error', {error: err});
});


app.listen( app.get('port'), () => console.log('Iniciando Api CRUD Express con MySQL'))
