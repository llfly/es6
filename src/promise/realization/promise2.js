//status

function Promise(fn){
    const value = null,
        deferreds = [],
        state = 'pending';

    const resolve = (newValue)=>{
        value = newValue;
        state = 'fulfilled';
        setTimeout(()=>{
            deferreds.forEach(deferred=>deferred(value))
        },0);
    }


    this.then = (onFulfilled)=>{
        if(state == 'pending'){
            deferreds.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    }

    fn(resolve);
}

//new Promise(resolve=>{
//    setTimeout(()=>{
//        console.log('done!');
//        resolve();
//    },3000);
//}).then(()=>{
//    console.log('then 1');
//}).then(()=>{
//    console.log('then 2');
//});


// ques : 串行问题
new Promise(resolve=>{
    setTimeout(()=>{
        console.log('done!');
        resolve();
    },3000)
}).then(setTimeout(()=>{
        console.log('1 timeout then');
    },2000)).then(()=>{
    console.log('2 then');
});