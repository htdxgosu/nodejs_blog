const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/blog_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully')
    }
    catch (error) {
        console.log('Connect failure')
    }
}

module.exports = { connect }