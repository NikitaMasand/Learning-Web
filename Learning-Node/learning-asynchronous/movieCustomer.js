// getCustomer(1,(customer)=>{
//     console.log('customer ', customer);
//     if(customer.isPrime){
//         getTopMovies((movies)=>{
//             console.log(movies);
//             sendEmail(customer.email,movies,()=>{
//                     console.log('email sent.....')
//             })
//         })
    
//     }
// });

// getCustomer(1)
//     .then(customer => getTopMovies(customer))
//     .then(movies => sendEmail(movies))
//     .then(string=>console.log(string))
//     .catch(err=>console.log(err.message))
checkAndSendEmail()
async function checkAndSendEmail(){
    try{
    const customer = await getCustomer(1);
    console.log(customer)
    if(customer.isPrime){
        const topMovies = await getTopMovies();
        console.log('top movies ',topMovies)
        await sendEmail(customer.email,topMovies);
        console.log('email sent.......');
    }
    }
    catch(err){
        console.log(err.message)
    }
}



function getCustomer(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(
                {
                    id: 1,
                    name : 'Nikita',
                    isPrime : true,
                    email : 'email'
                }
            )
        },3000);
    })
   
}

function getTopMovies(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            topMovies = ['movie1', 'movie2'];
            resolve(topMovies);
        }, 3000)
    })
}

function sendEmail(email, movies){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },3000)
    })
 
}