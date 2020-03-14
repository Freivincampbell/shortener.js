const mongoose = require('mongoose');

// Establish connection with our DB
const connection = async () =>  {
    try {
        await mongoose.connect('mongodb://localhost/urlShortener',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('>>> DB is connected 👏👏👏');
    }
    catch (e) {
        console.log('❌❌ ERROR >>> DB is not connected ❌❌');
    }
};

module.exports.connection = connection;