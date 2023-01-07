# ecommerce-store

Square Shift Ecommerce Node API

## API Usage

### POST /cart/item

```ssh
curl -X GET "https://ecom-store-node-api.onrender.com/cart/item?customerID=1&productID=101" -H 'accept:*/*'
```

#### Request Parameters

##### in query
  - customerID | number
  - productID | number | range: 101-119

#### Response

```JSON
{"statusCode":200,"status":"Item is successfully added to your cart."}
```

### GET /cart/items

```ssh
curl -X GET "https://ecom-store-node-api.onrender.com/cart/items?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in query
  - customerID | number

#### Response

```JSON
[
  {
    "_id":"63b7d246bb871b9034632bf7",
    "customerID":"1",
    "product":{
      "category":"electronics",
      "description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      "discount_percentage":9,
      "id":109,
      "image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      "price":64,
      "rating":{"count":203,"rate":3.3},
      "title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      "weight_in_grams":2050}
      },
  {
    "_id":"63b7d24ebb871b9034632bf8",
    "customerID":"1",
    "product":{
      "category":"jewelery",
      "description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      "discount_percentage":9.2,
      "id":106,
      "image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      "price":168,
      "rating":{"count":70,"rate":3.9},
      "title":"Solid Gold Petite Micropave ",
      "weight_in_grams":650}
  }]
```
### GET /cart/checkout-value

```ssh
curl -X GET "https://ecom-store-node-api.onrender.com/cart/checkout-value/465536?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in path
  - shippingPostalCode | number | range: 465535 - 465545

##### in query
  - customerID | number

#### Response

```JSON
{
  "customerID": "1",
  "postalCode": "465536",
  "distance": 220,  
  "totalItems": 3,
  "totalWeightInKg": 1.16,
  "actualPrice": 148.24,
  "discountedPrice": 139.6,
  "shippingCost": 50, 
  "checkOutValue": 189.6
  }
```


### DELETE /cart

```ssh
curl -X DELETE "https://ecom-store-node-api.onrender.com/cart?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in query
  - customerID | number

#### Response

```JSON
{"status":"Cart items for this customerID 1 are successfully deleted."}
```
