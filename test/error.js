//错误处理

// 1.最自然的就是使用try,catch，但它只能是同步的，无法用于异步代码模式

/*
function foo(){
    setTimeout(function(){
        baz.bar();
    },100);
}
try{
    foo();
    //后面从`baz.bar()`抛出全局错误
}
catch(err){
    //永远不会到达这里
    console.log('get error:',err);
}
*/


// 2. error-first 回调风格

function foo(cb){
    setTimeout(function(){
        try{
            var x = baz.bar();
            cb(null,x);//成功
        }
        catch (err){
            cb(err);
        }
    },100)
}

foo(function(err,val){
    if(err){
        console.error(err);//[ReferenceError: baz is not defined]  语句繁琐 && 只有在baz.bar()调用同步立即成功或失败的情况下,try..catch才能工作
    }else{
        console.log(val);
    }
});

// 3. promise split-callback(分离回调)

/*
var p = Promise.reject('Oops');
p.then(function fulfilled(){

},function rejected(error){
    console.log(err);//"Oops"；
});



var p = Promise.resolve(42);
p.then(function fulfilled(msg){
    console.log(msg.toLowerCase());
},function rejected(error){
    console.log(err);//永远不会到达这里
    //这个错误处理函数是为 promise p 准备的，而这个 promise 已经用值 42 填充了。
    // promise p 是不可变 的，所以唯一可以被通知这个错误的 promise 是从 p.then(..) 返回的那一个，但我们在此例中没有捕捉。
});
 */

var p = Promise.resolve(42);
p.then(function fulfilled(msg){
    console.log(msg.toLowerCase());
})
    .catch(function(handlerError){
        //如果这里面有错误怎么办？
    });


//有些Promise库 注册一个类似于“全局未处理拒绝”处理函数的东西，这样就不会抛出全局错误，而是调 用这个函数。



//浏览器有一个特有的功能是我们的代码所没有的:它们可以跟踪并了解所有对象被丢弃以及被垃圾回收的时机。所以，浏览器
//可以追踪 Promise 对象。如果在它被垃圾回收的时候其中有拒绝，浏览器就能够确保这是一个真正的未捕获错误，进而可以确 定应该将其报告到开发者终端。
