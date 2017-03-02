//1. Promise链中的错误容易被无意中忽略掉
//	先被reject之后能否被catch?
//2. Promise只能有一个完成值或一个拒绝理由（通常业务需要会构建一个对象或数组来保持多个信息，每一步都需要封装或解封，丑陋）


//1. 分裂值


function geyY(x){
	return new Promise((resolve,reject) =>
		setTimeout(()=>
			resolve((3 * x)-1)
		,100)
	)
}

/*
function foo(bar,baz){
	var x = bar * baz;
	return geyY(x)
	.then(y=>[x,y]);
}



foo(10,20)
.then(msgs=>{
	var x = msgs[0];
	var y = msgs[1];

	console.log(x,y);
})
*/


/*
function foo(bar,baz){
	var x = bar * baz;
	return [
		Promise.resolve(x),
		geyY(x)
	];
}

Promise.all([foo(10,20)])
.then(msgs=>{
	var x = msgs[0];
	var y = msgs[1];

	console.log(x,y);
})
*/

//2.展开／传递参数

function foo(bar,baz){
	var x = bar * baz;
	return [
		Promise.resolve(x),
		geyY(x)
	];
}

//1
function spread(fn){
	return Function.apply.bind(fn,null);
}

Promise.all(foo(10,20))
.then(spread(function(x,y){
	console.log(x,y);
}))

//2
Promise.all(foo(10,20))
.then(Function.apply.bind((x,y)=>console.log(x,y),null));

//3
Promise.all(foo(10,20))
.then(msgs=>{
	var [x,y] = msgs;
	console.log(x,y);
})

//4
Promise.all(foo(10,20))
.then(([x,y])=>console.log(x,y));



//3. 单决议