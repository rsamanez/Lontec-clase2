const AWS = require('aws-sdk');
const { v4 } = require("uuid");
AWS.config.update({region: "us-east-2"})
const userRouter = require("express").Router();
const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

userRouter.route("/books")
    .get(index)  // Get All Books
    .post(store); // Greate a New Book

userRouter.route("/books/:uid")
    .get(show)  // Get One Book by IDs
    .put(update) // Update a Book by Id
    .delete(remove);  // Delete a Book by id

    
function index(req,res){
    
    const params = {
        TableName: "LibraryTable"
    }
    try{
        documentClient.scan(params, function (err,data){
            if (err){
                console.log(err, err.stack);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        console.log(err);
    }
}

function store(req,res){
    const { title, author, publicacion } = req.body;
    const id = v4();
    const newBook = {
       id,
       title,
       author,
       publicacion
      };
      const params = {
          TableName: "LibraryTable",
          Item: newBook
      }
      try{
          documentClient.put(params, function (err){
              if (err){
                  console.log(err, err.stack);
              }else{
                  res.json(newBook)
              }
          });
      } catch (err){
          console.log(err);
      }
}

function show(req,res){
    const id = req.params.uid;
    const params = {
        TableName: "LibraryTable",
        Key: { id }
    }
    try{
        documentClient.get(params, function (err,data){
            if (err){
                console.log(err, err.stack);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        console.log(err);
    }
}

function update(req,res){
    const id = req.params.uid;
    const { title, author, publicacion } = req.body;
    const params = {
      TableName: "LibraryTable",
      Key: { id },
      UpdateExpression: "set title = :title, author = :author, publicacion = :publicacion ",
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":publicacion": publicacion
      },
      ReturnValues: "ALL_NEW",
    }
    try{
        documentClient.update(params, function (err, data){
            if (err){
                console.log(err, err.stack);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        console.log(err);
    }
}

function remove(req,res){
    const id = req.params.uid;
    const params = {
        TableName: "LibraryTable",
        Key: { id }
    }
    try{
        documentClient.delete(params, function (err){
            if (err){
                console.log(err, err.stack);
            }else{
                res.json({id,removed:"OK"})
            }
        });
    } catch (err){
        console.log(err);
    }
}


module.exports = userRouter;