//to connect to mongodb
const mongoose = require('mongoose')
//ideally, the connection string should come from the configuration file
//depending on either in production or development
//mongodbserver: mongodb://localhost
//databasename: mongodemoDatabase
//the first time we write something to database, mongodb will automatically create db for us
//if it's not

//connect method returns a promise
mongoose.connect('mongodb://localhost/learningmongodb', {useUnifiedTopology: true, useNewUrlParser: true })
.then(console.log('connected to mongo db..'))
.catch(err=>console.log('could not connect to mongodb ', err))

/*
no sql..schema less
1. collection: like a table in sql
2. documents: like rows 
3. schema: schema defines the shape of a document in the collection
Class, Object
Course, JavaCourse
schema types:
a. String
b. Number
c. Array
d. ObjectID
e. Buffer (for storing binary data)
f. Date
g. Boolean
*/
const courseSchema = new mongoose.Schema({
    //for data validation
    /*
    built in validators for string
    minlength, maxlength, match, enum
    for numbers and dates
    min, max
    */
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        // uppercase : true,
        trim : true //removes the padding around strings
        // match : /pattern/
    },
    //we use enum for an array of valid strings
    category : {
        type : String,
        required : true,
        lowercase : true,
        enum : ['web','mobile','network']
    },
    author : String,
    //custom validator
    tags : {
        type : Array,
        // validate : {
        //     validator : function(v){
        //         return v && v.length > 0;
        //     },
        //     message : 'A course should have atleast one tag'
        // }
        validate : {
            isAsync : true,
            validator : function(v, callback){
                setTimeout(()=>{
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
               
            },
            message : 'A course should have atleast one tag'
        }
       
    },
    date : {type : Date, default : Date.now },
    isPublished : {Boolean},
    price : {
        type : Number,
        //cannot use arrow func syntax, because that will us this in the context of function not the 
        //object
        required : function () { return this.isPublished },
        //custom getter and setter
        get : v => Math.round(v),
        set : v => Math.round(v),
    }
})

const Course = mongoose.model('courses',courseSchema);
// const course = new Course({
//     name: 'java',
//     author : 'nikita',
//     tags : ['java','backend','basics'],
//     isPublished : false
// })

//here we are dealing with async operation, it will take some time to save it


async function createCourse(){
    const course = new Course(
        {
            name : 'node.js',
            category : 'Web',
            author : 'abc',
            tags : ['backend'],
            isPublished : true,
            price : 15.8
        }
    )
console.log('......................')

//using callback function for validation because await returns a promise of void, so we
//can't store it in isValid boolean etc. thus. 
try{
    //!!!it gives validation path price req even if ispub is false
    course.validate((err) => {
        if(err) console.log(err.message)
    })
const result = await course.save();
console.log('saved.........')
console.log('Result.....',result)
}
catch(ex){
    // console.log(ex.message);
    for(field in ex.errors){
        console.log(ex.errors[field].message)
    }
}
}

createCourse();

//find method returns a document query object sort of like promise
async function getCourses(){
//   const courses = await Course.find();
//for filtering we pass the filter parameters in the find itself
// await Course.find({
//     author : 'nikita',
//     isPublished : false
// }) ..........for filtering
const courses = await Course
.find({_id : '5e0a0b6504a72656e8a8a874'})
.limit(10)
.sort({
    //1 for ascending, -1 for descending
    name : 1
})
.select({
    name : 1,
    tags : 1,
    price : 1
})
// .countDocuments() gives the count of documents selected
  console.log(courses[0].price);
}

getCourses()

/*
in mongodb there are a bunch of operators for comparison
mongoose is built on top of mongo db, so we have there also
eq : equal
ne : not equal
gt : greater than
gte : greater than or equal to
lt
lte
in
nin : not in

here we need to compare using JSON objects. In js, objects are key value pairs
we cannot express greater than etc comparison concept using js objects. we only have 10 
as value
.find({price : 10})

for comparison queries we pass an object which is also a key value pair container
$ -> to indicate it's an operator

{ price : {$gte : 10} } ......price>=10
{ price : {$gte : 10, $lte : 20} }  ...between 10 and 20 inclusive both
{ price : {$in : [10, 15, 20]} }  ...either 10, 15 or 20

Logical query operators: 
.find({ author : 'nikita', isPublished : false})
the above shows it's and operator because both conditions should be satisfied

for or:
.find() ...without any filters
.or([{author : 'nikita'}, {isPublished : false}]) ......array of filters

for and:
.and([{},{}])...similar to writing filters in find itself, 
useful for complex queries
*/

/*
Regular Expressions:
Nikita, Nikita M, Nikita Masand, Masand Nikita are all same authors
/pattern/
/^s/ : starting with string s
/s$/ : ending with string s
/pattern/i : for case insensitive for string s
.* : zero or many character
/.*s.* / : if s is contained inside 

.find({ author : /^nikita/, isPublished : false})
.find({ author : /nikita$/, isPublished : false})
.find({ author : /nikita$/i, isPublished : false})
.find({ author : /.*nikita.* /, isPublished : false})
*/

/*
pagination:
.limit() and .skip() go hand in hand
const pageNumber = 2;
const pageSize = 10;

in real world, we get these parameters as query string parameters to our restful APIs
/api/courses?pageNumber=2&pageSize=10
.skip((pageNumber-1)*pageSize)
.limit(pageSize)
*/

/*
to import data into the mongodb
mongoimport --db mongo-practice --collection courses --file exercise-data.json --jsonArray
*/
