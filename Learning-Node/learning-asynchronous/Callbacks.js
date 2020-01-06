/*
callback is a function that we call when the result of asynchronous object is ready 
callback Hell:
Synchronous way of below code:
console.log('before')
const user = getUser(1);
const repos = getRepos(user.name);
const commits = getCommits(repos[0]);
console.log('after')


*/
console.log('before');
//this is a deeply nested structure. we refer to this as callback hell or christmas tree problem
getUser(1,(user)=>{
    console.log('User ',user)
    getRepos(user.name,(repos)=>{
        console.log(repos);
        getCommits(repos[0],(commits)=>{
            console.log(commits);
        })
    })
});
console.log('after');
 

function getUser(id,callback){
    setTimeout(
        (id)=>{
            console.log('reading a user from database...')
            callback( {id: 1, name: 'nikita'} );
        },
        2000
    );
}

function getRepos(name,callback){
    setTimeout(
        (name)=>{
            console.log('calling github api to fetch users repositories...(dummy call)')
            repos = ['repo1','repo2','repo3']
            callback(repos);
        },
        2000
    )
}

function getCommits(repo,callback){
    setTimeout(
        (repo)=>{
            console.log('fetching commits for this repo....')
            commits = ['commit1','commit2','commit3']
            callback(commits);
        },
        2000
    )
}

