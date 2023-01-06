# ecommerce-store

Square Shift Ecommerce Node API

## API Usage

### POST /cart/item

```ssh
curl -X GET "http://localhost:8080/cart/item?customerID=1&productID=101" -H 'accept:*/*'
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
curl -X GET "http://localhost:8080/cart/items?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in query
  - customerID | number

#### Response

```JSON
[{"_id":"63b7d246bb871b9034632bf7","customerID":"1","product":{"category":"electronics","description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system","discount_percentage":9,"id":109,"image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg","price":64,"rating":{"count":203,"rate":3.3},"title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ","weight_in_grams":2050}},{"_id":"63b7d24ebb871b9034632bf8","customerID":"1","product":{"category":"jewelery","description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.","discount_percentage":9.2,"id":106,"image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg","price":168,"rating":{"count":70,"rate":3.9},"title":"Solid Gold Petite Micropave ","weight_in_grams":650}},{"_id":"63b7d254bb871b9034632bf9","customerID":"1","product":{"category":"men's clothing","description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.","discount_percentage":3,"id":104,"image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg","price":15.99,"rating":{"count":430,"rate":2.1},"title":"Mens Casual Slim Fit","weight_in_grams":430}},{"_id":"63b7d25cbb871b9034632bfa","customerID":"1","product":{"category":"men's clothing","description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","discount_percentage":7,"id":102,"image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","price":22.3,"rating":{"count":259,"rate":4.1},"title":"Mens Casual Premium Slim Fit T-Shirts ","weight_in_grams":380}},{"_id":"63b7d264bb871b9034632bfb","customerID":"1","product":{"category":"women's clothing","description":"95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem","discount_percentage":8.8,"id":118,"image":"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg","price":9.85,"rating":{"count":130,"rate":4.7},"title":"MBJ Women's Solid Short Sleeve Boat Neck V ","weight_in_grams":800}},{"_id":"63b7d26bbb871b9034632bfc","customerID":"1","product":{"category":"electronics","description":"Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)","discount_percentage":7.7,"id":110,"image":"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg","price":109,"rating":{"count":470,"rate":2.9},"title":"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s","weight_in_grams":3150}}]
```
### GET /cart/checkout-value

```ssh
curl -X GET "http://localhost:8080/cart/checkout-value/465536?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in path
  - shippingPostalCode | number | range: 465535 - 465545

##### in query
  - customerID | number

#### Response

```JSON
{"totalAmount":436.62}
```


### DELETE /cart

```ssh
curl -X DELETE "http://localhost:8080/cart?customerID=1" -H 'accept:*/*'
```

#### Request Parameters

##### in query
  - customerID | number

#### Response

```JSON
{"status":"Cart items for this customerID 1 are successfully deleted."}
```
