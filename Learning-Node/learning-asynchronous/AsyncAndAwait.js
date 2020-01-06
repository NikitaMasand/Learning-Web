//async await are written on top of promises
//helps us write async code like sync code...easier to look and understand using await operator
//any time we are calling a function that returns a promise
//we can await the result of that function and then get actual result just like calling sync func...

console.log('before');

//whenever we use await operation, we decorate that function using async modifier
//the following functions return type is promise of type void...promise that once fulfiled does not 
//return a value
async function displayCommits(){
    //when we are awaiting the result
    //we are not really waiting or blocking as in synchronous way
    //when it finds await, the thread is released to do some other work
try{
const user = await getUser(1);
const repos = await getRepos(user.name);
const commits = await getCommits(repos[0]);
console.log(commits);
}
catch(err){
    console.log(err.message)
}
}

//in async await, we cannot catch errors using catch as in promises
//we use try - catch block

displayCommits()
console.log('after');

function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(
            (id)=>{
                console.log('reading a user from database...')
                resolve( {id: 1, name: 'nikita'} );
                // reject(new Error('could not get repos'))
            },
            2000
        );
    })
    
}

function getRepos(name){
    return new Promise((resolve,reject)=>{
        setTimeout(
            (name)=>{
                console.log('calling github api to fetch users repositories...(dummy call)')
                repos = ['repo1','repo2','repo3']
                resolve(repos);
            },
            2000
        )
    })
  
}

function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(
            (repo)=>{
                console.log('fetching commits for this repo....')
                commits = ['commit1','commit2','commit3']
                resolve(commits);
            },
            2000
        )
    })
}



