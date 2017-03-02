function asyncFunction(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('Async hello world');
        },16);
    });
}


asyncFunction().then(value=>console.log(value)).catch(error=>console.log(error));


//peding = >Fulfilled or Rejected


