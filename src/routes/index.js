let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
	res.render('index', {
		title: 'CRUD Mysql Express'
	})
})

module.exports = router