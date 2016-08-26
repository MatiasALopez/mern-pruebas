var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/ece';

var db = {
    openDbAndExecuteIfNotError: function (callback) {
        MongoClient.connect(url, function(err, db) {
            if (err){
                console.log(err);
                return;
            }

            if (callback) {
                callback(db);
            }
        });
    }
};

module.exports = db;