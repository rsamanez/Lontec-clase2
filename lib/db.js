// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const createDbUser = async props => {
  const passwordHash = await bcrypt.hash(props.password, 8); // hash the pass
  delete props.password; // don't save it in clear text
  const newUser = {
    ...props,
    pk: props.email,
    sk: 'User',
    id: uuidv4(),
    type: "User",
    passwordHash,
    createdAt: new Date()
  };

  console.log('DATA:', newUser);
  const params = {
    TableName: "wa-api-users-table",
    Item: newUser
  }
  try {
    const result  = await docClient.put(params).promise();
    return user;
  } catch (err) {
    return err;
  }
};

const getUserByEmail = async email => {
  const params = {
    TableName: "wa-api-users-table",
    Key: { pk: email, sk: 'User'}
  }
  const response = await docClient.get(params).promise();
  console.log(response);
  return response;
};

module.exports = {
  createDbUser,
  getUserByEmail
};