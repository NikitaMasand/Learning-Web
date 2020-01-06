// (function (exports, module, require, __filename, __dirname){
    const EventEmitter = require('events');
       
   // console.log(__filename)
   // console.log(__dirname)
    const Logger = require('./logger');
    //console.log(Logger);

    const logger = new Logger();
    logger.on('messageLogged',function(arg){
        console.log("listening...",arg);
    });

    logger.log('message to logger');

    //exporting as a fucntion, not a object
    // const log = require('./logger.js')
    // log('message')


    // function sayHello(name){
    //     console.log("Hello " + name);
    // }

    // sayHello("Nikita");
    // // console.log(window)..this will give error
    // global.console.log("hi");
    // var message = '';
    // console.log(global.message);

    // console.log(module);

// }
// )