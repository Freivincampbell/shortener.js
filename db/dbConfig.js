module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://127.0.0.1/urlShortener',
        app: {
            name: 'urlShortener'
        }
    },
    production: {
        db: process.env.MONGODB, // url db mongoDB
        app: {
            name: 'urlShortener'
        }
    }
};