const AWS = require('aws-sdk');
console.log(AWS.VERSION);
AWS.config.update({region: "us-east-2"})
const userRouter = require("express").Router();

userRouter.route("/books")
    .get(index)  // Get All Books
    .post(store); // Greate a New Book

userRouter.route("/books/:uid")
    .get(show)  // Get One Book by IDs
    .put(update) // Update a Book by Id
    .delete(remove);  // Delete a Book by id

    
function index(req,res){
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});
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
    res.json({requestBody: req.body}) 
}

function show(req,res){
    const bookList = [
        {
            "title" : "La Serpiente de Oro",
            "author" : "Ciro Alegria",
            "publicacion" : 1935
        },
        {
            "title" : "La Ciudad de los Perros",
            "author" : "Mario Vargas Llosa",
            "publicacion" : 1963
        }
    ]
    res.json(bookList[req.params.uid]);
}

function update(req,res){
    const bookList = [
        {
            "title" : "La Serpiente de Oro",
            "author" : "Ciro Alegria",
            "publicacion" : 1935
        },
        {
            "title" : "La Ciudad de los Perros",
            "author" : "Mario Vargas Llosa",
            "publicacion" : 1963
        }
    ]
    bookList[req.params.uid] = req.body;
    res.json(bookList);
}

function remove(req,res){
    const bookList = [
        {
            "title" : "La Serpiente de Oro",
            "author" : "Ciro Alegria",
            "publicacion" : 1935
        },
        {
            "title" : "La Ciudad de los Perros",
            "author" : "Mario Vargas Llosa",
            "publicacion" : 1963
        }
    ]
    bookList.splice(req.params.uid, 1);
    res.json(bookList);
}


module.exports = userRouter;