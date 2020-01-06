const fs = require('fs')

//synchronous way
const files = fs.readdirSync('./')
console.log(files)


//asynchronous way
fs.readdir('./',function(err,files){
    if(err)
        console.log("error! ", err)
    else
        console.log(files)
});
