let express = require('express')
var app = express()

app.get('/',(req, res) => {
	req.getConnection((err, conn) => {
		conn.query('select * from team', (err, data) => {
			if(err) throw err
				res.render('index', {
					title: 'Identation Ward',
					data: data
				})
			})		
	})
})

module.exports = app

// exports.add = (req, res) => {
// 	res.render('/add', { title: 'Agregar Contacto' })
// }


// exports.showDb = (req, res) => {

// }
// 	('/verDb', (req, res, next) => {
// 	req.getConnection((err, conn) => {
// 		conn.query('show databases', (error, data) => {  //data:data
// 			if (!error) {
// 				res.render('verDb', {
// 					title: 'Ver Bases de Datos',
// 					data: data  
// 				})        
// 				console.log(data)               
// 			} else {
// 				console.log("ERROR: "+ error )
// 			}
// 		})
// 	})
// })
			
// app.post('/verTables/:Database', (req, res, next) => {
// 	req.getConnection((err, conn) => {
// 		let Database = req.params.Database			    
// 			conn.query('SHOW TABLES FROM '+ Database, (error, data) => {  //data:data
// 				if (!error) {
// 					res.render('verTables', {
// 						title: "Tables_in_" + Database,
// 						data: data  
// 					})        
// 					console.log(data)               
// 				} else {
// 					console.log("ERROR: "+ error )
// 				}
// 			})
// 		})      
// });
			
			
// app.post('/', (req, res, next) => {
// 	req.getConnection((err, conn) => {
// 		let contacto = {
// 			id: req.body.id,
// 			name: req.body.name
// 		};
			
// 		conn.query('INSERT INTO team SET ?', contacto, (err, data) => {
// 			if(!err) {
// 				res.redirect('/');
// 			} else {
// 				res.redirect('/agregar');
// 			}
// 		});
// 	});
// });
			
// app.get('/editar/:id', (req, res, next) => {
// 	let id =req.params.id
			
// 	req.getConnection((err, conn) => {
// 		conn.query('SELECT * FROM team WHERE id = ?', id, (err, data) => {
// 			if(!err) {
// 				res.render('edit', {
// 					title: 'Editar Contacto',
// 					data: data
// 				});
// 				console.log("edit: ",data)
// 			}
// 		});
// 	});
// });
			
// app.post('/actualizar/:id', (req, res, next) => {
// 	console.log("actualizar")
// 	req.getConnection((err, conn) => {
// 		let contacto = {
// 			id: req.body.id,
// 			name: req.body.name
// 		};		
// 		conn.query('UPDATE team SET name = ? WHERE id = ?', [contacto.name, contacto.id],(err, data) => {
// 			if(!err) {
// 				res.redirect('/');
// 			} else {
// 				res.redirect('/editar/');
// 				console.log("error: ", err)        
// 			}
// 		});
// 	});
// });
			
// app.post('/eliminar/:id', (req, res, next) => {
// 	req.getConnection((err, conn) => {
// 		let id = req.params.id;
			
// 		conn.query('DELETE FROM team WHERE id = ?', id, (err, data) => {
// 			if(!err) {
// 				res.redirect('/');
// 			} else {
// 				return next(new Error('Registro no encontrado'));
// 			}
// 		});
// 	});
// })