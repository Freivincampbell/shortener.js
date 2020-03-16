# Shortener.js with Nodejs, Express, MongoDB and shortid

> A simple shortener URLs project with js technologies

# We'd have install:

1. Nodejs
2. MongoDB


### To start with this project, we need to create its folder.
```bash
mkdir project_name
```
### we need to be into that file
```bash
cd project_name
```

### Then, we have to run npm init
```bash
npm init -y
```

> npm init initializes our project, so we are able to have a package.json

### we are going to install some dependencies with 
 ```bash
 npm install ejs express mongoose shortid
 ```
### Documentation
1. [Package ejs](https://www.npmjs.com/package/ejs)
1. [Package express](https://www.npmjs.com/package/express)
1. [Package mongoose](https://www.npmjs.com/package/mongoose)
1. [Package shortid](https://www.npmjs.com/package/shortid)
 
### we are going to install nodemon as a development dependency:
 ```bash
 npm install --save-dev nodemon
 ```
### Documentation
1. [Package nodemon](https://www.npmjs.com/package/nodemon)

> nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node, to use nodemon replace the word node on the command line when executing your script.

### We can add a  script into our package.json to use nodemon easily

``` json
"scripts": {
    "devStart": "nodemon server.js"
  }
```

Something is missing and it is our principal file, you can create your file and name it as you want, in this case I created as **server.js** the same name that you can see on the nodemon script


### Server file > server.js

into that file we are gonna set our configuration 

The file looks like:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
```



set our server configuration, and also wour **root path**, in this case it's going to return a **Hello World!**.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World!')
});
```


```javascript
app.listen(port, () => {
    console.log(`🚀🎉 Server ready at port ${port} 🚀🎉`);
});
```

in here we set our port then, we are able to go to **http://localhost:5000/** and it returns a Hello World! message.

at this level some configurations are missing:

1. Data Base.
2. Schema.
3. View.

### We will create a file into the root path as mongoDB connection and the file looks like:
```javascript
const mongoose = require('mongoose');

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
});
```

> Here we are using mongoose to create our connection, I am using async / await to wait for it, also I sent to params into that connection
>
>if the connection works it will return **>>> DB is connected 👏👏👏** if not an error message.

### Now, our ShortUrl file which works as our schema look like:
```javascript
const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
```
> We are using mongoose again to create our **Schema** also we export that to use it outside, and also shortId to create a unique url.

### The last thing missing is our view template, so **index.ejs** is gonna be our view in this example.

in this case I am using **bootstrap** to add some classes to this project, I used it with a CDN

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```

and finale our view

```html
<div class="container">
    <h1>URL Shrinker</h1>
    <form action="/shortUrls" method="POST" class="my-4 form-inline">
        <label for="fullUrl" class="sr-only">URL</label>
        <input required placeholder="URL" type="url" name="fullUrl" id="fullUrl" class="form-control col mr-2">
        <button type="submit" class="btn btn-success">Shrink</button>
    </form>

    <table class="table table-striped table-responsive">
        <thead>
        <tr>
            <th>
                Full URL
            </th>
            <th>
                Short URL
            </th>
            <th>
                Clicks
            </th>
        </tr>
        </thead>
        <tbody>
        <% shortUrls.forEach(shortUrl => { %>
            <tr>
                <td><a href="<%= shortUrl.full %>"> <%= shortUrl.full %> </a></td>
                <td><a href="<%= shortUrl.short %>"> <%= shortUrl.short %> </a></td>
                <td> <%= shortUrl.clicks %> </td>
            </tr>
        <% }) %>
    </table>
</div>
```

### We have to change and add some methods in our server.js file, so  let's go to update it

```javascript
app.get('/', async (req, res) => {

    const shortUrls = await ShortUrl.find();

    res.render('index', { shortUrls: shortUrls });
});
```
> our root path looks like that example, and also it return a variable with all the urls saved on our Mongo data base.


### It is our post method where it takes our form data and saves it as well then, it redirects us to root path

```javascript
app.post('/shortUrls', async (req, res) => {

    await ShortUrl.create({ full: req.body.fullUrl });

    res.redirect('/');
});
```


### Here we have our show method and also it increases the clicks one by one 
```javascript
app.get('/:shortUrl', async (req, res) => {

    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null ) return res.sendStatus(404);

    shortUrl.clicks++; 
    shortUrl.save();  

    res.redirect(shortUrl.full); 
});
```

### to finish there are missing some configurations to connect our data base and also the view engine that we are using, and of course, we must add our schema.


```javascript
const  Database  = require('./db/mongoDB');
const ShortUrl = require('./models/shortUrl');

Database.connection().then();

app.set('view engine', 'ejs');

// middleware to encoded requests
app.use(express.urlencoded({
    extended: false
}));
```


### after restarting our server, we are gonna user our project perfectly.


# THANKS SO MUCH 🔥🤓💻 

# TELEGRAM ✈️ 
[TELEGRAM](https://t.me/FreivinCampbell)

# Instagram 📷
[INSTAGRAM](https://instagram.com/freivincampbell)

# TWITTER 🐦
[TWITTER](https://twitter.com/freivincampbell)

