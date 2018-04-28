const express = require('express')
const router = express.Router()

const conn = require('../libs/db-connection')()

router.get('/', (req, res, next) => {
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
					console.log("ERROR: "+ error )
				}
			})
		}) 
		})
})
			
router.get('/agregar', (req, res, next) => {
	res.render('add',{ title: 'Agregar Contacto' });
});
			
router.get('/verDb', (req, res, next) => {
	req.getConnection((err, conn) => {
		conn.query('show databases', (error, data) => {  //data:data
			if (!error) {
				res.render('verDb', {
					title: 'Ver Bases de Datos',
					data: data  
				})        
				console.log(data)               
			} else {
				console.log("ERROR: "+ error )
			}
		})
	})
});
			
router.post('/verTables/:Database', (req, res, next) => {
	req.getConnection((err, conn) => {
		let Database = req.params.Database			    
			conn.query('SHOW TABLES FROM '+ Database, (error, data) => {  //data:data
				if (!error) {
					res.render('verTables', {
						title: "Tables_in_" + Database,
						data: data  
					})        
					console.log(data)               
				} else {
					console.log("ERROR: "+ error )
				}
			})
		})      
});
			
			
router.post('/', (req, res, next) => {
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
			
router.get('/editar/:id', (req, res, next) => {
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
			
router.post('/actualizar/:id', (req, res, next) => {
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
			
router.post('/eliminar/:id', (req, res, next) => {
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