const AWS = require('aws-sdk');

const { validationResult } = require('express-validator');
const { newBookValidation } = require('./validator.js')


const { v4 } = require("uuid");
AWS.config.update({region: "us-east-2"})
const userRouter = require("express").Router();
const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

userRouter.route("/books")
    .get(index)  // Get All Books
    .post(newBookValidation, store); // Greate a New Book

userRouter.route("/books/:uid")
    .get(show)  // Get One Book by IDs
    .put(newBookValidation,update) // Update a Book by Id
    .delete(remove);  // Delete a Book by id

    
function index(req,res){
    
    const params = {
        TableName: "LibraryTable"
    }
    try{
        documentClient.scan(params, function (err,data){
            if (err){
                res.json(err);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        res.json(err);
    }
}

function store(req,res){
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors){
        res.json(result);
    }else{
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
                    res.json(err);
                }else{
                    res.json(newBook)
                }
            });
        } catch (err){
            res.json(err);
        }
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
                res.json(err);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        res.json(err);
    }
}

function update(req,res){
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors){
        res.json(result);
    }else{
        const id = req.params.uid;
        const { title, author, publicacion } = req.body;
        const params = {
        TableName: "LibraryTable",
        Key: { id },
        UpdateExpression: "set title = :title, author = :author, publicacion = :publicacion ",
        ConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":title": title,
            ":author": author,
            ":publicacion": publicacion,
            ":id": id
        },
        ReturnValues: "ALL_NEW",
        }
        try{
            documentClient.update(params, function (err, data){
                if (err){
                    res.json(err);
                }else{
                    res.json(data)
                }
            });
        } catch (err){
            res.json(err);
        }
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