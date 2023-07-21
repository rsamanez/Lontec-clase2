const AWS = require('aws-sdk');

const { validationResult } = require('express-validator');
const { cleanerValidation, setUpdateCleanerValues } = require('./validator.js')


const { v4 } = require("uuid");
AWS.config.update({ region: "us-east-1" })
const userRouter = require("express").Router();
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const TABLE_NAME = "Cleaners";

userRouter.route("/cleaners")
    .get(index)  // Get All Cleaners
    .post(cleanerValidation, store); // Create a New Cleaner

userRouter.route("/cleaners/:uid")
    .get(show)  // Get One Cleaner by IDs
    .put(update) // Update a Cleaner by Id
    .delete(remove);  // Delete a Cleaner by id


function index(req, res) {

    const params = {
        TableName: TABLE_NAME
    }
    try {
        documentClient.scan(params, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data)
            }
        });
    } catch (err) {
        res.json(err);
    }
}

function store(req, res) {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        res.json(result);
    } else {
        const id = v4();
        const newCleaner = {
            id,
            ...req.body
        };
        const params = {
            TableName: TABLE_NAME,
            Item: newCleaner
        }
        try {
            documentClient.put(params, function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(newCleaner)
                }
            });
        } catch (err) {
            res.json(err);
        }
    }
}

function show(req, res) {
    const id = req.params.uid;
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    }
    try {
        documentClient.get(params, function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data)
            }
        });
    } catch (err) {
        res.json(err);
    }
}

function update(req, res) {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        res.json(result);
    } else {
        const id = req.params.uid;
        const { updExpression, attributeValues } = setUpdateCleanerValues(req.body);
        // const { title, author, publicacion } = req.body;
        const params = {
            TableName: TABLE_NAME,
            Key: { id },
            UpdateExpression: updExpression, // "set title = :title, author = :author, publicacion = :publicacion ",
            ConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id,
                ...attributeValues
            },
            // ExpressionAttributeValues: {
            //     ":title": title,
            //     ":author": author,
            //     ":publicacion": publicacion,
            //     ":id": id
            // },
            ReturnValues: "ALL_NEW",
        }
        try {
            documentClient.update(params, function (err, data) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(data)
                }
            });
        } catch (err) {
            res.json(err);
        }
    }
}

function remove(req, res) {
    const id = req.params.uid;
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    }
    try {
        documentClient.delete(params, function (err) {
            if (err) {
                console.log(err, err.stack);
            } else {
                res.json({ id, removed: "OK" })
            }
        });
    } catch (err) {
        console.log(err);
    }
}

function GetValues(body) {
    let updExpression = 'set';
    let attributeValues = null;
    if('name' in body){
        updExpression = `${updExpression} name = :name`;
        attributeValues = {
            ':name' : body.name
        };
    }
    if('phoneNumber' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} phoneNumber = :phoneNumber`;
        attributeValues = {
            ...attributeValues,
            ':phoneNumber' : body.phoneNumber
        };
    }
    if('rating' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} rating = :rating`;
        attributeValues = {
            ...attributeValues,
            ':rating' : body.rating
        };
    }
    if('ratingQ' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} ratingQ = :ratingQ`;
        attributeValues = {
            ...attributeValues,
            ':ratingQ' : body.ratingQ
        };
    }
    if('stripe' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} stripe = :stripe`;
        attributeValues = {
            ...attributeValues,
            ':stripe' : body.stripe
        };
    }
    if('sterling' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} sterling = :sterling`;
        attributeValues = {
            ...attributeValues,
            ':sterling' : body.WW
        };
    }
    if('myTeams' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} myTeams = :myTeams`;
        attributeValues = {
            ...attributeValues,
            ':myTeams' : body.myTeams
        };
    }
    if('myTeamsDefault' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} myTeamsDefault = :myTeamsDefault`;
        attributeValues = {
            ...attributeValues,
            ':myTeamsDefault' : body.myTeamsDefault
        };
    }
    if('businessName' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} businessName = :businessName`;
        attributeValues = {
            ...attributeValues,
            ':businessName' : body.businessName
        };
    }
    if('address1' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} address1 = :address1`;
        attributeValues = {
            ...attributeValues,
            ':address1' : body.address1
        };
    }
    if('address2' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} address2 = :address2`;
        attributeValues = {
            ...attributeValues,
            ':address2' : body.address2
        };
    }
    if('city' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} city = :city`;
        attributeValues = {
            ...attributeValues,
            ':city' : body.city
        };
    }
    if('stateCode' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} stateCode = :stateCode`;
        attributeValues = {
            ...attributeValues,
            ':stateCode' : body.stateCode
        };
    }
    if('stateName' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} stateName = :stateName`;
        attributeValues = {
            ...attributeValues,
            ':stateName' : body.stateName
        };
    }
    if('postalCode' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} postalCode = :postalCode`;
        attributeValues = {
            ...attributeValues,
            ':postalCode' : body.postalCode
        };
    }
    if('status' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} status = :status`;
        attributeValues = {
            ...attributeValues,
            ':status' : body.status
        };
    }
    if('subscription' in body){
        updExpression = updExpression !== 'set' ? `${updExpression},` : `${updExpression}`;
        updExpression = `${updExpression} subscription = :subscription`;
        attributeValues = {
            ...attributeValues,
            ':subscription' : body.subscription
        };
    }
    return {
        attributeValues,
        updExpression
    }
}


module.exports = userRouter;