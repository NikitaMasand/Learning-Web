/*
a promise is an object that holds the eventual result of an asynchronous operation
when an async operation completes, it can either result in some value or an error.
a promise promises us to give the result of an async operation

1. initially when we create the promise object, it will be in the pending state
2. after some async operation, the promise will either be in fulfilled state(async op was successful)
or rejected state(error in asyn op)
we will have to return the value in promise to it's consumers
we send this result using resolve or reject
resolve(result value) or 
reject(new Error(reject error msg))
p.then...for getting the result of async operation
p.catch...for catching errors
*/

// const p = new Promise((resolve, reject)=>{
//     //some async oprration..........
//     setTimeout(()=>{
//         // resolve(1); pending => resolved, fulfiled
//         reject(new Error('error!!')) //pending => rejected
//     },2000)

// })

// p
//     .then(result=>console.log('Result ',result))
//     .catch(err=>console.log('error ',err.message));

//replacing callbacks to return a promise


//consuming promises
console.log('before');
// getUser(1,(user)=>{
//     console.log('User ',user)
//     getRepos(user.name,(repos)=>{
//         console.log(repos);
//         getCommits(repos[0],(commits)=>{
//             console.log(commits);
//         })
//     })
// });


//flat structure... because promises expose then method
//we can chain them to implement complex asynchronous operations

getUser(1)
    .then(user => getRepos(user.name))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(error => console.log('error ',error.message))
    
console.log('after');

function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(
            ()=>{
                console.log('reading a user from database...')
                resolve( {id: 1, name: 'nikita'} );
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



