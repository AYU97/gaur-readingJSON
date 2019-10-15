var express = require('express');
var router = new express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

router.get('/',function getProducts( req, res ) {


    var connectionURL = 'mongodb+srv://assignment:assignment@cluster1-cbev9.mongodb.net/test?retryWrites=true&w=majority';
    var databaseName = 'products-table';

    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {


        if(error) {
          return console.log('Unable to connect to database');
        }

        const db = client.db(databaseName);


       let queryParams = req.query.query || '' ;
       console.log(queryParams);
       let queryObj = {};

       let isQueryValid = false;

        if( queryParams.indexOf('OR') === -1 && queryParams.indexOf('AND') === -1 ) {

            queryObj = {
                'title' : {
                    '$regex' : '^.*' + queryParams + '.*$'
            }
            }

            isQueryValid = true;

        } else if( queryParams.indexOf('OR') === -1 && queryParams.indexOf('AND') > -1 ) {

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

            isQueryValid = true;

        } else if( queryParams.indexOf('OR') > -1 && queryParams.indexOf('AND') === -1 ) {

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

            isQueryValid = true;

        } else {

            res.send({
                'status' : 403,
                'message' : "This type of query is not supported yet"
            });

            isQueryValid = false;

        }

 
        if( isQueryValid ) {


            db.collection('products').find(queryObj).toArray( function(err, docs) {
                if (err) {
                  // Reject the Promise with an error
                    return (err)
                }
               console.log(docs);
               res.send(docs);
            });

        }

    });

});

module.exports = router;