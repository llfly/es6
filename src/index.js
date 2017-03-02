function geyY(x){
	return new Promise((resolve,reject) =>
		setTimeout(()=>
			resolve((3 * x)-1)
		,100)
	)
}

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
.then([x,y]=>console.log(x,y));