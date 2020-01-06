const EventEmitter = require('events')
const emitter = new EventEmitter();


//register a listener
emitter.on('message Logged', (arg) => {
    //this is a call back function
    console.log('listener called ',arg)
})

//Raise an event

emitter.emit('message Logged',{id:1, url:'http://....'})
//without registering a listener, nothing will added, 
//as there is no one listening to the emitted message
//thus we need to register a listener, and that listener should be written before in order, as after
//emitting all the registered listeners that came into picture till now are iterated