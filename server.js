const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/test?retryWrites=false";

//CONNECTION
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Connection to DataBase successfuly established!");
//   db.close();
// });

// //CREATE COLLECTION
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// //INSERT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// //FIND
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   dbo.collection("customers").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

// //QUERY
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   var query = { address: "Highway 37" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //SORT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   var mysort = { name: 1 };
//   dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //DELETE
// // MongoClient.connect(url, function(err, db) {
// //   if (err) throw err;
// //   var dbo = db.db("H2Oil");
// //   var myquery = { address: 'Mountain 21' };
// //   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
// //     if (err) throw err;
// //     console.log("1 document deleted");
// //     db.close();
// //   });
// // });

// //DROP COLLECTION
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   dbo.collection("customers").drop(function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
// });

// //UPDATE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   var myquery = { address: "Valley 345" };
//   var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
//   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// }); 

// //LIMIT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   dbo.collection("customers").find().limit(5).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //JOIN
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("H2Oil");
//   dbo.collection('orders').aggregate([
//     { $lookup:
//        {
//          from: 'products',
//          localField: 'product_id',
//          foreignField: '_id',
//          as: 'orderdetails'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
//   });
// });

app.listen(3000, () => console.log('Connection available on port 3000'));