const express = require('express');
const router = express.Router();

const courses = [
    { id:1, name:'course1' },
    { id:2, name:'course2' },
    { id:3, name:'course3' },
];

const Joi = require('joi');
//we will not write /api/courses everywhere
//we will use / because in index we have already told, for any route starting wtih /api/courses
//go to this route..thus /
router.get('/',(req,res) => {
    res.send(courses);
});

//a schema defines shape of object...basically like data dict
//length, required parameters, range, etc

router.post('/', (req,res) => {
    const { error } = validateCourse(req.body);
    // console.log(result);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id',(req,res) => {

    //look up the course
    //if not existing, return resource not found -- 404
    const course = courses.find(c => c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send("course id not found")
    }
    //validate
    //if invalid, return bad request -- 400
    const result = validateCourse(req.body);
    //object destruction
    const { error } = validateCourse(req.body);
    // console.log(result);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course
    course.name = req.body.name
    //return the updated course
    res.send(course);
});


router.delete('/:id', (req,res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send("course id not found")
    }
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course)
});
//route parameters: for essential or required values
// => for matches
router.get('/:id',(req,res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send("course id not found")
    }
    res.send(course)
});


function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
}

module.exports = router;