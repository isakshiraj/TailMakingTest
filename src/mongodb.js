const mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb://localhost:27017/TrailMakingTestLoginSignup")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.log("failed to connect", error);
    });

// Define the schema
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    results: [{
        partATiming: {
            type: String,
            required: true
        },
        partBTiming: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const collection1 = mongoose.model("LogInConnection", LogInSchema);

module.exports = collection1;
