const course = require('./routes/courses')
const home = require('./routes/home');
const config = require('config');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup')
//the above debug reuqire returns a func, we call that function and pass an argument to it
//the argument is the namespace for writing debugging messages in that space only
const dbDebugger = require('debug')('app:db')
//the above is for debugging db related messages

const morgan = require('morgan'); // logs the http requests on the console
//express returns a function
//nodemon is watching all the files
//any file with any extension
//to call http services, we use an extension..postman
const express = require('express');
const logger = require('./middleware/logger')
const authenticate = require('./middleware/authenticate');
//joi returns class
const Joi = require('joi');
//this function express returns an object of type express
const app = express();
//to enable parsing of json objects in the body of request

//this will internally require the pug, we don't write it
app.set('view engine','pug');
app.set('views','./views') //second parameter is for where we store the templates
console.log(`NODE_ENV : ${process.env.NODE_ENV}`); // BYDEFAULT: UNDEFINED
//We can have this as development, production, etc. 
console.log(`app: ${ app.get('env') }`)//development by default


//express.json returns a middleware 
//to use that middleware in the request processing pipeline
app.use(express.json());
//like below we used logger function from other file as a middleware
//the json used above is also working the similar way
//it takes req, res and next as parameters
//it takes the request body, works on json format, passes it on to next function

app.use(express.urlencoded({ extended : true }));
//it parses incoming requests with url encoded payload...key=value&key=value and populates req.body
//with extended true we can pass arrays and complex objects

app.use(express.static('public')) 
//public is the name of folder..contains static things ..images, css files, etc
//with this middleware we can serve static content
//http://localhost:3000/readme.txt...note that public is not their in url
app.use(helmet());
app.use('/',home);
app.use('/api/courses',course) // for any route with /api/courses, use course router to handle

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    // console.log('morgan enabled...')
    startupDebugger('morgan enabled');
}



// app.get('/api/posts/:year/:month',(req,res) => {
//     res.send(req.query);
// });

//db work:
dbDebugger('connected to database');

app.use(logger);
app.use(authenticate);
//get uses two args...the first one is the path/url and the second is callback funct that will
//be called when we have an http get request at this endpoint
//request has info about incoming request

// this callback function is also called as route handler..


//query string parameters : ? sortBy=name...for anything that is optional



//PORT (environment variable)
//process is a global object

// const port = process.env.PORT || 3000;
const port = 3000

app.listen(port,()=>{
    console.log(`listening on port... ${port}`);
})



//configuration
console.log('Application name ' + config.get('name'));
console.log('Mail server name ' + config.get('mail.host'));
//console.log('Mail password ' + config.get('mail.password'));


