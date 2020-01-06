//we resolve the callback hell problem using named functions
//replace the anonymous function for callback with a named function
//issue: if I write the getCommits_callback as just getCommits, I am getting error for callback(commits)
//is not a function. thus I wrote it with _callback to differentiate, it worked. but why 
//not by the previous way?
console.log('before');
getUser(1,getRepos_callback);
console.log('after');

function getRepos_callback(user){
    console.log('User ',user)
    getRepos(user.name,getCommits_callback)
}
function getCommits_callback(repos){
    console.log(repos);
    getCommits(repos[0],displayCommits)
}
function displayCommits(commits){
    console.log(commits);
}
function getUser(id,callback){
    setTimeout(
        (id)=>{
            console.log('reading a user from database...')
            callback( {id: id, name: 'nikita'} );
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

