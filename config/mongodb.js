const db = "jwt-demo";
const host = "localhost";
const port = "27017";
const password = "abc123";
const user = "shirshendu";

const mongouri = "mongodb://"+ user + ":" + password + "@" + host + ":" + port + "/" + db;

module.exports = mongouri