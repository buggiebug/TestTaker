const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectDatabase = () => {
    try {
        mongoose
            .connect(process.env.MONGODB_URL)
            .then((res) => {
                console.log(`Database connection established : ${res.connection.host}`)
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDatabase;
