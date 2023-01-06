'use strict'

const CartDAO = require('../model/CartDAO')
const ShippingChargeDAO = require('../model/ShippingChargesDAO')
const ConsumerAPI = require('./ConsumerAPI')

class CartController {

  static apiAddItemToCartByCustomerID = async (req, res, next) => {
    let customerID, productID
    const query = req.query
    if (!!query) {
      if (!!query.customerID) {
        customerID = query.customerID
      }
      if (!!query.customerID) {
        productID = query.productID
      }
    }
    try {
      if (!!productID) {
        const item = await ConsumerAPI.getProductByID(productID);
        if (!!item) {
          if (!!customerID) {
            await CartDAO.addItemToCartByCustomerID(customerID, item)
            res.status(200).json({ statusCode: 200, status: "Item is successfully added to your cart." })
          } else {
            throw new Error("Missing customerID.")
          }
        } else {
          throw new Error("Invalid productID.")
        }
      } else {
        throw new Error("Missing productID")
      }
    } catch (ex) {
      res.status(404).json({ Error: "Not Found." })
      return
    }
  }

  static apiListItems = async (req, res, next) => {
    let customerID
    const query = req.query
    if (!!query) {
      if (!!query.customerID) {
        customerID = query.customerID
      }
    }
    try {
      if (!!customerID) {
        const result = await CartDAO.listItemsByCustomerID(customerID);
        res.send(result)
      }
    } catch (ex) {
      res.status(404).json({ Error: `No items found for this customerID ${customerID}.` })
      return
    }
  }

  static apiDeleteCart = async (req, res, next) => {
    let customerID
    const query = req.query
    if (!!query) {
      if (!!query.customerID) {
        customerID = query.customerID
      }
    }
    try {
      await CartDAO.deleteCartByCustomerID(customerID)
      res.status(200).json({ status: `Cart items for this customerID ${customerID} are successfully deleted.` })
    } catch (ex) {
      res.status(404).json({ Error: `No items found for this customerID ${customerID}.` })
      return
    }
  }

  static apiGetCheckOutValueByPostCode = async (req, res, next) => {
    let customerID, postalCode
    const query = req.query
    const params = req.params
    if (!!query) {
      if (!!query.customerID) {
        customerID = query.customerID
      }
    }
    if (!!params) {
      if (!!params.shippingPostalCode) {
        postalCode = params.shippingPostalCode
      }
    }

    try {
      if (!!postalCode) {
        const distance = await ConsumerAPI.getDistanceFromPostalCode(postalCode)
        const billDetails = await CartDAO.getWeightAndPriceAfterDiscount(customerID)
        const shippingCost = await ShippingChargeDAO.getCalculatedShippingCharge(billDetails.totalWeight, distance)

        const checkOutValue = billDetails.totalDiscountedPrice + shippingCost

        const checkOutValueDetails = {
          customerID,
          postalCode,
          distance,
          totalItems: billDetails.count,
          totalWeightInKg: billDetails.totalWeight,
          actualPrice: billDetails.totalActualPrice,
          discountedPrice: billDetails.totalDiscountedPrice,
          shippingCost,
          checkOutValue
        }
        res.status(200).json(checkOutValueDetails)
      }
    } catch (ex) {
      res.status(404).json({ Error: `No items found for this customerID ${customerID}.` })
      return
    }
  }
}

module.exports = CartController;