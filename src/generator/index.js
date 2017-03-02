var x = 1;
function *(){
	x++;
	yield;
	console.log('x',x);
}
function bar(){
	x++;
}

var it = foo();
it.next();
x;//2
bar();
x;//3
it.next();//x:3


//it = foo() 运算并没有执行生成器，而是构造了一个迭代器(iterator)，这个迭代器会控制它的执行