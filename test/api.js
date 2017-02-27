//Promise

const p1 = new Promise((resolve, reject)=> {
    setTimeout(()=> {
        resolve('p1 done');
    }, 2000)
});
const p2 = new Promise((resolve, reject)=> {
    setTimeout(()=> {
        resolve('p2 done');
    }, 500)
});

const timeoutPromise = delay=> {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('Timeout!');
        }, delay);
    })
}

//all
//gate
//从 Promise.all([ .. ]) 返回的主 promise 在且仅在所有的成员 promise 都完成后才会完成。
// 如果这些 promise 中有任何一个被拒绝的话，主 Promise.all([ .. ]) promise 就会立即被拒绝，并丢弃来自其他所有 promise的全部结果。

Promise.all([
    p1, p2
]).then(results=> {
    console.log('all', results);
});


//race
//门闩 竞态
//一旦有任何一个 Promise 决议为完成，Promise.race([ .. ]) 就会完成;一旦有任何一个 Promise 决议为拒绝，它就会拒绝.


//如果race传入空[],主race([..]) Promise 永远不会决议
Promise.race([
    p1, p2
]).then(results=> {
    console.log('race', results);
});


//没有任何输出
//Promise.race([]).then(results=> {
//    console.log('race', results);
//}, reject=> {
//    console.log(reject);
//});

//1. 超时竞赛

Promise.race([p1,timeoutPromise(1000)]).then(results=>{
    console.log('timeoutPromiseResolve',results);
},reject=>{
    console.log('timeoutPromiseReject',reject);
});

//2.finally


//在各种各样的 Promise 库中，finally(..) 还是会创建并返回一个新的 Promise(以支持链接继续)。
//如果 cleanup(..) 函数要返回一个 Promise 的话，这个 promise 就会被连接到链中，这意味着这里还是会有前面讨论过的未处理拒绝问题。


if(!Promise.observe){
    Promise.observe = (pr,cb)=>{
        pr.then(msg=>Promise.resolve(msg).then(cb),
            err=>Promise.resolve(err).then(cb));
        return pr;
    }
}


Promise.race([
    Promise.observe(foo(),function cleanup(msg){

    }),
    timeoutPromise(3000)
]);


//none([ .. ])
//这个模式类似于 all([ .. ]) ，不过完成和拒绝的情况互换了。所有的 Promise 都要被拒绝，即拒绝转化为完成值，反之亦然。
//any([ .. ])
//这个模式与 all([ .. ]) 类似，但是会忽略拒绝，所以只需要完成一个而不是全部
//first([ .. ])
//这个模式类似于与 any([ .. ]) 的竞争，即只要第一个 Promise 完成，它就会忽略后续的任何拒绝和完成。
//last([ .. ])
//这个模式类似于 first([ .. ]) ，但却是只有最后一个完成胜出。


// 在这个 first(..) 实现中，如它的所有 promise 都拒绝的话，它不会拒绝。它只会挂住，非常类似于 Promise.race([]) 。
// 如果需要的话，可以添加额外的逻辑跟踪每个 promise 拒绝。如果所有的 promise 都被拒绝，就在主 promise 上调用 reject() 。

if(!Promise.first){
    Promise.first = function(prs){
        return new Promise((resolve,reject)=>{
            prs.forEach(pr=>Promise.resolve(pr).then(resolve));
        })
    }
}