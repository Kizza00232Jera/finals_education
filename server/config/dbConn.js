const mongoose = require('mongoose')

// Set strictQuery to prepare for Mongoose 7 or suppress the warning
mongoose.set('strictQuery', false); // or true if you prefer strict schema querying

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB