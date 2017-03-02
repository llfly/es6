//yield 消息双向传递

/*
function *foo(x) {
    var y = x * (yield "hello");
    return y;
}

var it = foo(6);

var res = it.next();//规范和所有兼容浏览器都会默默丢弃传递给第一个 next() 的任何东西。
res.value; //"Hello"


res = it.next(7);
res.value; //42
*/

//多个迭代器
function *foo() {
    var x = yield 2;
    z++;
    var y = yield(x * z);
    console.log(x, y, z);
}
var z = 1;
var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;//2
var val2 = it2.next().value;//2

val1 = it1.next(val2 * 10).value;//40 x:20 z:2
val2 = it2.next(val1 * 5).value;//600 x:200 z:3


it1.next(val2/2);//y:300 20 300 3
it2.next(val1/4);//y:10  200 10 3


//可以通过生成器，在共享的相同变量上迭代交替执行，可以模拟多线程竞态条件
var a = 1;
var b = 2;

function *foo(){
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}


function *bar(){
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}

function step(gen){
    var it =gen();
    var last;

    return function (){
        //不管yield出来的是什么，下一次都把它原样传回去
        last = it.next(last).value;
    }
}


//生成器产生值
//生产者与迭代器
