const express = require('express')
const router = express.Router()
const controllers = require("../controllers/index")

router.get('/initialData', controllers.initialData)
router.post('/list', controllers.list)
router.patch('/list/:id', controllers.updateOrder)
router.post('/card', controllers.card.createCard)

module.exports = router;