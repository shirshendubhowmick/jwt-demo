const db = "jwt-demo"; // enter your mongodb db name here
const host = "localhost"; //enter your mongodb hostname here
const port = "27017"; // enter your host port here
const password = "abc123"; // enter mongodb password here
const user = "shirshendu"; // enter mongodb username here

const mongouri = "mongodb://"+ user + ":" + password + "@" + host + ":" + port + "/" + db;

module.exports = mongouri