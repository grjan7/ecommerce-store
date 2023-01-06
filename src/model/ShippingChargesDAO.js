'use strict'

const { ObjectId } = require('bson')
const shippingCharges = require("./shipping_charges.json")

let shipping_charges

class ShippingChargeDAO {
  /**
   * 
   * @param {*} conn 
   * @returns 
   */
  static injectDB = async (conn) => {
    if (shipping_charges) {
      return
    }
    try {
      shipping_charges = await conn.db(process.env.DATABASE_NAME).collection("shipping_charges")
      await shipping_charges.insertMany(shippingCharges);
    } catch (e) {
      console.error(`Unable to establish collection handles in ShippingChargeDAO: ${e}`)
    }
  }

  /**
   * 
   * @param {*} weight 
   * @param {*} distance 
   * @returns 
   */
  static getCalculatedShippingCharge = async (weight, distance) => {
    const knownMaxWeight = 20;
    const knownMaxDistance = 800;
    let filter = {};

    if (weight <= knownMaxWeight) {
      filter["weight.max"] = {
        '$gte': weight
      }
      filter["weight.min"] = {
        '$lt': weight
      }
    } else {
      filter["weight.min"] = {
        '$eq': knownMaxWeight
      }
    }

    if (distance <= knownMaxDistance) {
      filter["distance.max"] = {
        '$gte': distance
      }
      filter["distance.min"] = {
        '$lt': distance
      }
    } else {
      filter["distance.min"] = {
        '$eq': knownMaxDistance
      }
    }

    const pipeline = [
      {
        '$match': filter
      }, {
        '$project': {
          '_id': 0,
          'price': '$price.amount'
        }
      }
    ];

    try {
      const results = await (await shipping_charges.aggregate(pipeline)).toArray()
      return results[0].price
    } catch (ex) {
      return { error: 'Results are too large, be more restrictive in filter.' }
    }
  }
}

module.exports = ShippingChargeDAO;

