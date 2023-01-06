'use strict'

const app = require('./server')
const { MongoClient } = require('mongodb')
const CartDAO = require('./model/CartDAO')
const ShippingChargeDAO = require('./model/ShippingChargesDAO')

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.ECOMMERCE_STORE_DB_URI,
  { useNewUrlParser: true, writeConcern: { wtimeout: 2500 } }
).catch(err => {
  console.error(err.stack)
  process.exit(1)
}).then(async client => {
  await ShippingChargeDAO.injectDB(client)
  await CartDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})

