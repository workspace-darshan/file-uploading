var mongoose = require("mongoose");

//========================================
// connection to mongo db
//========================================

const dbConfig = {
    host: "mongodb://localhost:27017/uploading",
    url: "mongodb://localhost:27017/uploading",
    dbName: "uploading",
    port: 27017,
};

const mongoUri = dbConfig.host;
const db = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("db connect thai gayu lala...");
    } catch (error) {
        mongoose.connection.on("error", () => {
            throw new Error(`Te shu dakho karyo te db connect j nahi thatu : ${dbConfig.dbName}`);
        });
    }
};

module.exports = db;
