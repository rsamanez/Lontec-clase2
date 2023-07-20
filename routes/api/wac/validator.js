const { check, oneOf } = require('express-validator');

exports.cleanerValidation = [
    check('wixMemberId','wixMemberId is required').exists().isUUID(),
    check('name','Cleaner name is required').exists(),
    check('phoneNumber','Cleaner phoneNumber is required').exists().isMobilePhone(),
    check('email','Cleaner email is required').exists().trim().isEmail(),
    check('businessName','Cleaner businessName is required').exists(),
    check('address1','Cleaner address1 is required').exists(),
    check('city','Cleaner city is required').exists(),
    check('stateCode','Cleaner stateCode is required').exists(),
    check('postalCode','Cleaner postalCode is required').exists(),
    check('status','Cleaner status is required').exists(),
    check('subscription','Cleaner subscription is required').exists()
] 

exports.setUpdateCleanerValues = (body) => {
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