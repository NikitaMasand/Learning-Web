const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

    
class Logger extends EventEmitter {
    // we don't write function keyword inside class methods
    log(message){
    //send an HTTP request
    console.log(message);
    this.emit('messageLogged',{id:1, url:'http://...'});
}

}

//url and log are private
//to be able to access or call log method from app.js
//exports is one of the properties of module objects
//exports : {}

    
module.exports = Logger; // rhs log is our function defined
// lhs log is something we will use everywhere else
// module.exports.endPoint = url;
// module.exports = log;
//exports.log = log; also works

//exports = log does not work, i.e directly exporting the function, not the object does not work
//because exports point to module.exports, exports = log, makes it's meaning different

