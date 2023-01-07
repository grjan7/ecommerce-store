'use strict'

const { MongoClient } = require('mongodb')
const shippingCharges = require("./shipping_charges.json")

let shipping_charges

class ShippingChargeDAO {
  /**
   * 
   * @param {MongoClient} conn
   * @returns 
   * @description
   * 
   * Checks if the shipping_charges collection exists.
   *  
   * If the collection does not exist, creates the one for shipping_charges 
   * and imports data from shipping_charges.json. 
   * 
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
   * @param {number} weight 
   * @param {number} distance 
   * @returns {number} shipping cost for the given weight and distance
   * 
   */
  static getCalculatedShippingCharge = async (weight, distance) => {
    const knownMaxWeight = 20;
    const knownMaxDistance = 800;
    let filter = {};

    /** 
     * The range for weight and distance are continuous and uncapped, so the collection has been
     * designed in such way that its document will not have max property for weight and distance
     * if their min value is 20 and 800, respectively.
     * 
     * So, the filter predicate has been made dynamic by not including query for max property of
     * weight and distance when they exceed their knownMax value (20 and 800).
     * 
     * if(weight < 20)
     *    weight > weight.min
     *    weight <= weight.max
     * 
     * if(weight > 20)
     *    weight.min = 20
     * 
     * It is same for distance too. 
     *  
     * */

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

    /**
     * This pipeline has two stages:
     * stage 1: filters the collection
     * stage 2: returns only the price field
     * eg. [{ price: 100.10 }]
     */
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
      const shippingCost = results[0].price
      return shippingCost
    } catch (ex) {
      return { error: 'Results are too large, be more restrictive in filter.' }
    }
  }
}

/**
 * @type ShippingCharge
 * {
    "weight": {
      "min": <number>,
      "max": <number>,
      "unit": <string>
    },
    "distance": {
      "min": <number>,
      "max": <number>,
      "unit": <string>
    },
    "price": {
      "amount": <number>,
      "unit": <string>
    }
  }
 */

module.exports = ShippingChargeDAO;

