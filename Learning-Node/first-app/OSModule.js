const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("Total memory: "+ totalMemory);
console.log("Free memory: "+freeMemory);

//template string
//ES6 / ES2015 : ECMAScript 6
//helps us build a string without concatenation using backtic char
console.log(`Total memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);