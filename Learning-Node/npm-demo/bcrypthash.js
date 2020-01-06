const bcryptjs = require('bcryptjs');

//to hash a password, we need salt.
/*
1234 -> abcd (one way hashing algorithm)
abcd is stored in database.

however one can compile a list of common passwords and hash them 
and check which one's are there in the database.
and they have that original password who was hashed to check for in db. i.e they know abcd is for 1234

salt is a random string that is added before or after the original password each time
and thus the hash of that string is found out, and the resulting password is different depending on the
salt that is used.

genSalt's first argument is the number of rounds we want to run the algorithm to generate the salt.
the higher the number, the complex the salt is and is harder to break, but will take longer time

no. of rounds we use are included in the salt

*/

async function run(){
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('1234',salt);
    console.log(salt);
    console.log(hashedPassword);
}

run();