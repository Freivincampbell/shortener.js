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

### npm init initializes our project, so we are able to have a package.json

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


```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
```

```javascript
app.get('/', (req, res) => {
    console.log('Server with NODEjs');
});
```


```javascript
app.listen(port, () => {
    console.log(`🚀🎉 Server ready at port ${port} 🚀🎉`);
});
```