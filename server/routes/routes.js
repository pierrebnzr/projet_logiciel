const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const { postRegister, postLogin } = require('../controllers/oauth.controller');

router.post('/register', postRegister)
router.post('/login', postLogin)

router.post('/addresses', controller.createAddress)

router.get('/restaurants', controller.getRestaurantsList)
router.post('/restaurants', controller.createRestaurant)

router.get('/dishes', controller.getDishesList)

router.put('/modify', controller.modifyDish) 

router.post('/add', controller.addDish) 

router.get('/orders', controller.getOrders)

router.put('/modifyemail', controller.modifyEmail)

router.put('/modifypwd', controller.modifyPassword)

router.post('/clientorder', controller.order)

<<<<<<< HEAD
router.get('/getDeliveryAddress', controller.getDeliveryAddress)
=======
router.put('/acceptorder', controller.acceptOrder)
>>>>>>> 1c77443ea6068f8e73fe97aa86ad16cddc363ec6

module.exports = router;