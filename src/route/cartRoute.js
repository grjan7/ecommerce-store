'use strict'

const { Router } = require('express')
const CartCtrl = require('../controller/CartController')
const router = new Router()

router.route('/').delete(CartCtrl.apiDeleteCart)
router.route('/item').post(CartCtrl.apiAddItemToCartByCustomerID)
router.route('/items').get(CartCtrl.apiListItems)
router.route('/checkout-value/:shippingPostalCode').get(CartCtrl.apiGetCheckOutValueByPostCode)

module.exports = router
