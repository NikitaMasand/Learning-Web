//create/return a promise already resolved
//used in unit testing

const p = Promise.resolve({id: 1})
p.then(result => console.log(result))

const p1 = Promise.reject(new Error('message'))
p1.catch(err=>console.log(err.message))