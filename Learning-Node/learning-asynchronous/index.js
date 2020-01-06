//synchronous: 
// console.log('Before');
// console.log('After');

//asynchronous:
console.log('before');
//scheduling a task to be performed in future, it does not wait/block. 
const user = getUser(1);
//this will print undefined.because the settimeout function is executed 2s after
//the call to getUser func. thus getUser at the time of it's calling, cannot return anything from
//setTimeout. how to get access to that returned user object in settimeout? how to get the 
//result of an asynchronous operation

//there are 3 patterns to deal with asynchronous code
//1. Callbacks
//2. Promises
//3. Async/await

console.log(user); //undefined
console.log('after');

function getUser(id){
    setTimeout(()=>{
        console.log('reading a user from db......')
        return {id: id, gitHubUserName: 'Nikita'}
    }, 2000)

}