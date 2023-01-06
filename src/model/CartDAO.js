'use strict'

const { ObjectId } = require('bson')
let carts

class CartDAO {
  static injectDB = async (conn) => {
    if (carts) {
      return
    }
    try {
      carts = await conn.db(process.env.DATABASE_NAME).collection("carts")
    } catch (e) {
      console.error(`Unable to establish collection handles in CartDAO: ${e}`)
    }
  }

  static addItemToCartByCustomerID = async (customerID, product) => {
    const cartItem = { customerID, product }
    try {
      await carts.insertOne(cartItem)
    } catch (ex) {
      throw new Error(ex)
    }
  }

  static listItemsByCustomerID = async (customerID) => {
    try {
      const result = await carts.find({ customerID }, { product: 1 }).toArray()
      return result
    } catch (ex) {
      throw new Error(ex)
    }
  }

  static deleteCartByCustomerID = async (customerID) => {
    try {
      await carts.deleteMany({ customerID })
    } catch (ex) {
      throw new Error(ex)
    }
  }

  static getWeightAndPriceAfterDiscount = async (customerID) => {
    const pipeline = [
      {
        $match: { customerID }
      },
      {
        $project: {
          "price": "$product.price",
          "priceAfterDiscount": {
            $subtract: ["$product.price",
              {
                $multiply: ["$product.price", "$product.discount_percentage", 0.01]
              }
            ]
          },
          "weight": "$product.weight_in_grams"
        }
      },
      {
        $group: {
          _id: null,
          totalActualPrice: { $sum: "$price" },
          totalDiscountedPrice: { $sum: "$priceAfterDiscount" },
          totalWeight: { $sum: "$weight" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          "totalActualPrice": { $round: ["$totalActualPrice", 2] },
          "totalDiscountedPrice": { $round: ["$totalDiscountedPrice", 2] },
          "totalWeight": { $round: [{ $divide: ["$totalWeight", 1000] }, 3] }
        }
      }
    ]
    try {
      const result = await (await carts.aggregate(pipeline)).toArray()
      return result[0]
    } catch (ex) {
      return { error: 'Results are too large, be more restrictive in filter.' }
    }
  }

}

module.exports = CartDAO;