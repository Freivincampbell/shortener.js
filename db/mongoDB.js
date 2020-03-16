const env = process.env.NODE_ENV || 'development';
const config = require('./dbConfig')[env];
const mongoose = require('mongoose');

// Establish connection with our DB
const connection = async () =>  {
    try {
        mongoose.Promise = global.Promise;
        const db = await mongoose.connect(config.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('>>> DB is connected 👏👏👏');
        return db;
    }
    catch (e) {
        console.log('❌❌ ERROR >>> DB is not connected ❌❌');
    }


};

module.exports.connection = connection;