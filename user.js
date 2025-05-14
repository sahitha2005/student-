
const { MongoClient } = require('mongodb');

const mongoUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUrl);
const dbName = "loginDB";

async function saveUser(data) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("users");

        
        if (typeof data.hobbies === "string") {
            data.hobbies = [data.hobbies];
        }

       
        data._id = data.regno;
        delete data.regno;

        await collection.insertOne(data);
        console.log("Saved to MongoDB:", data);
    } catch (err) {
        if (err.code === 11000) {
            console.error("Duplicate register number. Already exists.");
            throw new Error("Register number already exists.");
        } else {
            console.error("MongoDB Error:", err);
            throw err;
        }
    }
}

module.exports = { saveUser };
