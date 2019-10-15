var express = require('express');
var fetch = require("node-fetch");
var router = require('../router/index');
var bodyParser = require('body-parser');

var app = express()
//app.use(bodyParser());

app.use(bodyParser.urlencoded({
  extended : false
}))

app.use(router);
var port = process.env.PORT || 3000;

/* For inserting into Database
function getProducts() {
  const url = "https://s3.amazonaws.com/open-to-cors/assignment.json";
  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

getProducts()
  .then(data => {
    const productsCount = data.count;
    const products = [];
    /**
     * Converting products object to array
     */
    
   /*  Object.entries(data.products).forEach(([key, value]) => {
      const newProduct = { ...value };
      newProduct.product_id = key;
      products.push(newProduct);
    }, products);

    console.log(productsCount, products);
    /**
     * Insert products data into mongodb here
     */
 
    /* var url = "mongodb+srv://assignment:assignment@cluster1-cbev9.mongodb.net/test?retryWrites=true&w=majority";  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("products-table");
      dbo.collection("products").insertMany(products, function(err, res) {
        if (err) throw err;
        console.log("documents inserted");
        db.close();
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
*/

app.listen(port,()=>{
    console.log('Server is up on port 3000');
})

