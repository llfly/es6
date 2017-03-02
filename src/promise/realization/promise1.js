//function Promise(fn){
//    const value = null , deferreds = [];
//
//    const reslove = ()=>{
//        deferreds.forEach(deferred=>deferred(value));
//    }
//    this.then = onFulfilled => {
//        deferreds.push(onFulfilled);
//        return this;//链式调用
//    };
//
//    fn(reslove);
//}
//
//
//new Promise(resolve=>{
//    setTimeout(()=>{
//        console.log('promise start');
//        resolve();
//    },2000)})
//    .then(()=>{
//        console.log('promise end1');
//    }).then(()=>{
//    console.log('promise end2');
//});


//quest :
// 通过return this 链式调用
// 如果 promise 是同步代码，resolve 会先于 then 执行，这时 deferreds 队列还空无一物，更严重的是，后续注册的回调再也不会被执行了。
// 通过 setTimeout 将 resolve 中执行回调的逻辑放置到 JS 任务队列末尾


const getUserId = ()=> new Promise(resolve=>resolve(9876));


getUserId().then(id=>console.log('do sth with', id));



function Prmomise(fn){
    const value = null,
        deferreds = [],
        resolve = value=>{
            setTimeout(()=>{
                deferreds.forEach(deferred=>deferred(value));
            },0);
        }
    this.then = onFulfilled =>{deferreds.push(onFulfilled);return this};

    fn(resolve);

}


// 如何隐式注入并执行resolve??


