// Connection URL 
const collection_name = "ip_db";
const host = "localhost";
const username = "";
const password = "";

var mongo_connection_url = "mongodb://localhost:27017/" + collection_name;

// Exporting the URL and Collection Name 
exports.mongo_connection_url = mongo_connection_url;
exports.collection_name = collection_name;