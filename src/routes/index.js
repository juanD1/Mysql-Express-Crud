let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {	
	req.getConnection((err, conn) => {
		conn.query('select * from team', (error, data) => {
			if (!error) {
				res.render('index', {
				  title: 'CRUD Mysql Express',
				  data: data  
				})        
				console.log(data)               
			} else {
				console.log("ERROR: ", error )
			}
		})
	})
})

router.get('/agregar', (req, res, next) => {
	res.render('add',{ title: 'Agregar Contacto' });
})

module.exports = router