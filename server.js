const express = require('express');
const app = express();
const  Database  = require('./db/mongoDB');
const ShortUrl = require('./models/shortUrl');
const port = process.env.PORT || 5000;

Database.connection().then();

// kinda view we use
app.set('view engine', 'ejs');

// middleware to encoded requests
app.use(express.urlencoded({
    extended: false
}));

// root path our project
app.get('/', async (req, res) => {
    // Find all URL we already have
    const shortUrls = await ShortUrl.find();
    // render index view with all URLs
    res.render('index', { shortUrls: shortUrls });
});

// find a specific URL and return the original URL
app.get('/:shortUrl', async (req, res) => {
    // find method to search the short URL
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null ) return res.sendStatus(404);

    shortUrl.clicks++; // increases on 1 the cki
    shortUrl.save();  // save with a new click increased

    res.redirect(shortUrl.full); // redirect to original URL after finding it
});

// To create new shortUrls
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });

    res.redirect('/'); // after that redirect to root path
});


// EXPRESS PORT
app.listen(port, () => {
    console.log(`🚀🎉 Server ready at port http://localhost:${port} 🚀🎉`);
});