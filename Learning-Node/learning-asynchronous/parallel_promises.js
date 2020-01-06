/*
call to github and twitter api
and do something when the result of both of them is ready
i.e run a few async operations in paralle and when they all complete then return the result to client 
or do something
*/

const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
           console.log('async operation 1')
           resolve(1);
        //   reject(new Error('failed'))
    },2000)
})

const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
            console.log('async operation 2')
            resolve(2);
    },2000)
})

//this method will return the new promise that will be resolved when all the promises in the array
//passed are resolved
//both are resolved at almost the same time
//we don't have any real concurrency here. we have one single thread that deals with multiple
//async operations almost at same time. it is not waiting for the result of first async operation to 
//get ready for the next to be executed
//like in previous.
//if anyone of promise is rejected, the final one is also rejected
Promise.all([p,p1])
    .then(result => console.log(result))
    .catch(err=>console.log(err.message));



//sometimes you want to run multiple async operations, but you want to do something as soon as 
//one of them completes...we use race
Promise.race([p,p1])
    .then(result=>console.log(result))
    .catch(err=>console.log(err.message));

    //value of first fulfilled promise