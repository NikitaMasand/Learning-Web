const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-practice',{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('error connecting to db ', err));

const courseSchema = new mongoose.Schema({
    tags : [String],
    date : {type : Date, default : Date.now},
    name : String,
    author : String,
    isPublished : Boolean,
    price : Number,
    __v : Number
})

const Course = mongoose.model('courses',courseSchema);

async function getCourse1(){
return await Course.find({tags : 'backend',isPublished : true})
                                //.sort('name') for ascending and .sort('-name') for descending
                                .sort({name : 1})
                                //.select('name author')
                                .select({name : 1, author : 1});                   
}
async function run1(){
        const courses = await getCourse1()
        console.log(courses);
}
// run1();

async function getCourse2(){
    return await Course.find({tags : {$in : ['backend', 'frontend' ] },isPublished : true})
                                    .sort('-price')
                                    .select('name author price');                   
    }
    async function run2(){
            const courses = await getCourse2()
            console.log(courses);
    }
    // run2();

    async function getCourse3(){
        return await Course.find({isPublished : true})
    .or([{price : {$gte : 15}}, {name : /.*by.*/i }])
        }
        async function run3(){
                const courses = await getCourse3()
                console.log(courses);
        }
        // run3();

/*
for updating a course:
2 approach:
Query first:
we use this approach when we update the document depending on a certain check needed
so we retrieve, check if it does not satisfy then return
else update.
 -findById()
 -modify it's properties
 -save()

 Update first:
 -update directly
 -optionally get the updated document
*/

//not working. type error! save is not a function

// async function updateCourseQueryFirst(){
//       const course = await Course.find({name : 'Express.js Course'});
//       if(!course) {
//         console.log('eror')
//         return;
//       }
//       course.isPublished = true;
//       course.author = 'abc'

// //       course.set({
// //               isPublished : true,
// //               author : 'abc'
// //        } )
//      try{
//       const result = await course.save();
//        console.log(result);
//      }
//      catch(err){
//              console.log(err)
//      }

// }

// updateCourseQueryFirst();

async function updateCourseUpdateFirst(){
        const result = await Course.updateOne({name : 'Node.js Course'}, {
                $set : {
                        isPublished : false,
                        author : 'nikita'
                }
        }
                );

         console.log(result);
  }

  updateCourseUpdateFirst()

async function removeCourse(){
        const course = await Course.find({name : 'ASP.NET' })
        console.log(course);
        const result = await Course.deleteOne({name : 'ASP.NET'});
        
        console.log(result)
}

removeCourse()