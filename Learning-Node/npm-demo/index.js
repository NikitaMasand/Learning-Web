var _ = require('underscore');
//checks this required module in following steps:
//1. Assumes this is a core module
//2. it is a file or folder in this project, checks if this starts with ./ or something else
//3. assumes this module exists inside node_modules

var result = _.contains([1,2,3],2);
console.log(result);