//1. then 方法的鸭子类型

//如何判断一个值是不是真正的Promise?

/*
 var a = new Promise(function (resolve, reject) {
 console.log(1);
 });

 console.log(typeof a, Object.prototype.toString.call(a), a instanceof Promise);
 //'object' '[object Object]' true
 */

//Promise 值可能是从其他浏览器窗口(iframe 等)接收到的。这个浏览器窗口自己的 Promise 可能和当前窗口 /frame 的不同，因此这样的检查无法识别 Promise 实例。
//库或框架可能会选择实现自己的 Promise，而不是使用原生 ES6 Promise 实现。


//识别 Promise(或者行为类似于 Promise 的东西)就是定义某种称为 thenable 的东西，将其定义为任何具有 then(..) 方 法的对象和函数。
// 我们认为，任何这样的值就是 Promise 一致的 thenable。


// 根据一个值的形态(具有哪些属性)对这个值的类型做出一些假定。
// 这种类型检查 (type check)一般用术语鸭子类型 (duck typing)来表示——“如果它看起来像只鸭子，叫起来像只鸭子，那它一定就是只鸭子”。

/*
 if (p != null && (typeof p === 'object' || typeof p === 'function') && typeof p.then === 'function') {

 }
 */

//还有其他选择，比如 branding，甚至 anti-branding。


//回调问题
//1. 调用回调过早
//2. 调用回调过晚（或不被调用）
//3. 调用回调次数过少或过多
//4. 未能传递所需的环境和参数
//5. 吞掉可能出现的错误和异常


//调用过晚
// Promise 创建对象调用 resolve(..) 或 reject(..) 时，这个 Promise 的 then(..) 注册的观察回调就会被自动调度。
// 这些被调度的回调在下一个异步事件点上一定会被触发
var p3 = new Promise(function (resolve, reject) {
    resolve("B");
});
var p1 = new Promise(function (resolve, reject) {
    resolve(p3);
});
p2 = new Promise(function (resolve, reject) {
    resolve("A");
});

p1.then(function (v) {
    console.log(v);
});
p2.then(function (v) {
    console.log(v);
});
//A B

//p1 不是用立即值而是用另一个 promise p3 决议，后者本身决议为值 "B" 。
// 规定的行为是把 p3 展开到 p1 ，但是是异步地展开。所以，在异步任务队列中，p1 的回调排在 p2 的回调之后


//回调未执行
function timeoutPromise(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('Timeout!');
        }, delay);
    })
}

Promise.race([
    foo(),
    timeoutPromise(3000)
]).then(function () {
    //及时执行完
}, function (err) {
    //拒绝或超时
});

//吞掉错误或异常
var p = new Promise(function (resolve, reject) {
    foo.bar();
    resolve(42);//永远不会执行到这
});
p.then(
    function fulfilled() {
        // 永远不会到达这里
    },
    function rejected(err) {
        // err将会是一个TypeError异常对象来自foo.bar()这一行
    });


var p = new Promise(function (resolve, reject) {
    resolve(42);//永远不会执行到这
});
p.then(
    function fulfilled(msg) {
        foo.bar();
        console.log(msg);
        // 永远不会到达这里
    },
    function rejected(err) {
        // 永远不会到达这里
    });


//如果向 Promise.resolve(..) 传递一个非 Promise、非 thenable 的立即值，就会得到一个用这个值填充的 promise。
var p1 = new Promise(function (resolve, reject) {
    resolve(42);
});
var p2 = Promise.resolve(42);
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);
p1 === p2; // true
//如果向 Promise.resolve(..) 传递了一个非 Promise 的 thenable 值，前者就会试图展开这个值，
//而且展开过程会持续到提取出一个具体的非类 Promise 的最终值。
var p = {
    then: function (cb) {
        cb(42);
    }
};
// 这可以工作，但只是因为幸运而已
p.then(
    function fulfilled(val) {
        console.log(val); // 42
    },
    function rejected(err) {
// 永远不会到达这里
    });


var p = {
    then: function (cb, errcb) {
        cb(42);
        errcb("evil laugh");
    }
};
p.then(
    function fulfilled(val) {
        console.log(val); // 42
    },
    function rejected(err) {
        // 啊，不应该运行!
        console.log(err); // 邪恶的笑
    });

//Promise.resolve(..) 可以接受任何 thenable，将其解封为它的非 thenable 值。
// 从 Promise.resolve(..) 得到的是一 个真正的 Promise，是一个可以信任的值。
// 如果你传入的已经是真正的 Promise，那么你得到的就是它本身，所以通过 Promise.resolve(..) 过滤来获得可信任性完全没有坏处。


//Promise.resolve(..) 会将传入的真正 Promise 直接返回，对传入的 thenable 则会展 开。如果这个 thenable 展开得到一个拒绝状态，那么从 Promise.resolve(..) 返回的 Promise 实际上就是这同一个拒绝状态。
//所以对这个 API 方法来说，Promise.resolve(..) 是一个精确的好名字，因为它实际上的结果可能是完成或拒绝

var rejectedPr = new Promise(function (resolve, reject) { // 用一个被拒绝的promise完成这个promise
    resolve(Promise.reject("Oops"));
});
rejectedPr.then(function fulfilled() {
    // 永远不会到达这里
    },
    function rejected(err) {
        console.log(err); // "Oops"
    }
);


//reject(..) 不会像 resolve(..) 一样进行展开。如果向 reject(..) 传入一个 Promise/thenable 值，它会把 这个值原封不动地设置为拒绝理由。后续的拒绝处理函数接收到的是你实际传给 reject(..) 的那个 Promise/thenable，而不是其底层的立即值。





//链式调用
//固有行为特性：
//调用 Promise 的 then(..) 会自动创建一个新的 Promise 从调用返回。
//在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的(可链接的)Promise 就相应地决议。
//如果完成或拒绝处理函数返回一个 Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前 then(..) 返回的链接 Promise 的决议值。


var p = Promise.resolve(21);
p.then(function (v) {
        console.log(v); // 21
// 创建一个promise并将其返回
        return new Promise(function (resolve, reject) {
            // 用值42填充
            resolve(v * 2);
        });
    })
    .then(function (v) {
        console.log(v);
    });


var p = Promise.resolve(21);
p.then(function (v) {
        console.log(v); // 21
        // 创建一个promise并返回
        return new Promise(function (resolve, reject) {
            // 引入异步!
            setTimeout(function () {
                // 用值42填充
                resolve(v * 2);
            }, 100);
        });
    })
    .then(function (v) {
        // 在前一步中的100ms延迟之后运行
        console.log(v); // 42
    });


function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time);
    });
}
delay(100) // 步骤1
    .then(function STEP2() {
        console.log("step 2 return delay( 200)");
    })
    .then(function STEP3() {
        console.log("step 3 (after 100ms)");
    })
    .then(function STEP4() {
        console.log("step 4 (after 100ms)");
        return delay(50);
    })
    .then(function STEP5() {
        console.log("step 5 (after 100ms)");
    });