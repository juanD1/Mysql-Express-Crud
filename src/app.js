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

let app = express()

const indexRoutes = require('./routes/')

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views' ))
app.set('view engine', 'pug')

//Middlewares
app.use(logger('dev'))
app.use( bodyParser.json())
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( publicDir )
app.use( favicon )

//Connection
app.use(conn)

//Routes
app.get('/', (req, res, next) => {
  req.getConnection((err, conn) => {
    conn.query('use indentation_war', (error, data) => {  //data:data   
      conn.query('select * from team', (error, data) => {  //data:data
        if (!error) {
          res.render('index', {
            title: 'Identation Ward',
            data: data  
          })        
          console.log(data)               
        } else {
          console.log("ERROR: ", error )
        }
      })
    }) 
    })
})

app.get('/agregar', (req, res, next) => {
	res.render('add',{ title: 'Agregar Contacto' });
});

app.get('/verDb', (req, res, next) => {
	req.getConnection((err, conn) => {
    conn.query('show databases', (error, data) => {  //data:data
      if (!error) {
        res.render('verDb', {
          title: 'Ver Bases de Datos',
          data: data  
        })        
        console.log(data)               
      } else {
        console.log("ERROR: ", error )
      }
    })
  })
});

app.post('/verTables/:Database', (req, res, next) => {
	req.getConnection((err, conn) => {
    let Database = req.params.Database			    
      conn.query('SHOW TABLES FROM ' + Database, (error, data) => {  //data:data
        if (!error) {
          res.render('verTables', {
            title: "Tables_in_" + Database,
            data: data  
          })        
          console.log(data)               
        } else {
          console.log("ERROR: ", error )
        }
      })
    })      
});


app.post('/', (req, res, next) => {
	req.getConnection((err, conn) => {
		let contacto = {
			id: req.body.id,
			name: req.body.name
		};

		conn.query('INSERT INTO team SET ?', contacto, (err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				res.redirect('/agregar');
			}
		});
	});
});

app.get('/editar/:id', (req, res, next) => {
	let id =req.params.id

	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM team WHERE id = ?', id, (err, data) => {
			if(!err) {
				res.render('edit', {
					title: 'Editar Contacto',
					data: data
        });
        console.log("edit: ",data)
			}
		});
	});
});

app.post('/actualizar/:id', (req, res, next) => {
  console.log("actualizar")
	req.getConnection((err, conn) => {
		let contacto = {
			id: req.body.id,
			name: req.body.name
		};		
		conn.query('UPDATE team SET name = ? WHERE id = ?', [contacto.name, contacto.id],(err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
        res.redirect('/editar/');
        console.log("error: ", err)        
			}
		});
	});
});

app.post('/eliminar/:id', (req, res, next) => {
	req.getConnection((err, conn) => {
		let id = req.params.id;

		conn.query('DELETE FROM team WHERE id = ?', id, (err, data) => {
			if(!err) {
				res.redirect('/');
			} else {
				return next(new Error('Registro no encontrado'));
			}
		});
	});
});

app.use((req, res, next) => {
  let err = new Error();
	err.status = 404;
	err.statusText = 'NOT FOUND';

	res.render('error', {error: err});
});


app.listen(app.get('port'), () => {
	console.log('server Crud-MySQL-express on port ', app.get('port'))
})


