var express = require('express');
var router = new express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

router.get('/',function getProducts( req, res ) {

       let queryParams = req.query.params;
       let queryObj = {};

        if( queryParams.indexOf('OR') === -1 && queryParams.indexOf('AND') > -1 ) {

            let titleArray = queryParams.split('AND');

        queryObj['$and'] = [];

            for(let title of titleArray ) {

                let obj = {
                    'title' : {
                        '$regex' : '^.*' + title + '.*$'
            }
                }

                queryObj['$and'].push(obj);

            }   

        } 
        else if( queryParams.indexOf('OR') > -1 && queryParams.indexOf('AND') === -1 ) {

            let titleArray = queryParams.split('OR');

                queryObj['$or'] = [];

            for(let title of titleArray ) {

                let obj = {
                    'title' : {
                        '$regex' : '^.*' + title + '.*$'
                }
            }

                queryObj['$or'].push(obj);

            }       

        } 
        else {

            res.send({
                'status' : 403,
'message' : "This type of query is not supported yet"
});

}
var connectionURL= 'mongodb+srv://assignment:assignment@cluster1-cbev9.mongodb.net/test?retryWrites=true&w=majority'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

        var databaseName = 'products_table';
        if(error) {
          return console.log('Unable to connect to database');
}

        var db = client.db(databaseName);
db.collection('products').find(queryObj).toArray( function(err, docs) {
            if (err) {
              // Reject the Promise with an error
return (err)
            }
           console.log(docs);
           res.send(docs)
});

});


});

module.exports = router;