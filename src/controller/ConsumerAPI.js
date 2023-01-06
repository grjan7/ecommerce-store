"use strict";

const axios = require('axios');

class ConsumerAPI {
  /**
   * 
   * @param {*} productID
   * @returns 
   */
  static getProductByID = async (productID) => {
    const isValidProductID = productID >= 100 && productID <= 119;
    if (!!isValidProductID) {
      const url = `http://15.206.157.204:8080/product/${productID}`
      const opts = {
        method: "GET",
        headers: {
          accept: "*/*"
        },
        url
      }
      try {
        const { data } = await axios(opts)
        return data.response
      } catch (ex) {
        throw new Error(ex)
      }
    } else {
      throw new Error("Invalid productID. productID must be in the range of 100 to 119.")
    }
  }

  /**
   * 
   * @param {*} postalCode 
   * @returns 
   */
  static getDistanceFromPostalCode = async (postalCode) => {
    const isValidPostalCode = postalCode >= 465535 && postalCode <= 465545;
    if (!!isValidPostalCode) {
      const url = `http://15.206.157.204:8080/warehouse/distance?postal_code=${postalCode}`
      const opts = {
        method: "GET",
        headers: {
          accept: "*/*"
        },
        url
      }
      try {
        const { data } = await axios(opts)
        return data.distance_in_kilometers
      } catch (ex) {
        throw new Error(ex)
      }
    } else {
      throw new Error("Invalid postalCode. postalCode must be in the range of 465535 to 465545.")
    }
  }
}

module.exports = ConsumerAPI