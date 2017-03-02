//---------------------------------------------------//

//使用回调的话，通知就是任务调用的回调
//foo完成后，通知它的回调


foo(x){
	//sometime
	return listener;
}

var evt = foo(42);
evt.on('completion',function(){
	//next
});
evt.on('error',function(){
});



//使用Promise的话，侦听来自foo(...)的事件，然后在得到通知的时候，根据情况继续
var evt = foo(42);

//让 bar 和 baz侦听foo的完成
bar(evt);
vaz(evt);

//其实evt就是promise的一个模拟
function foo(x){
	//...
	return new Promise(function(resolve,reject){
		//最终调用resolve或者reject
	})
}
var p  = foo(42);
bar(p);
baz(p);
//p.then(bar,oopsBar);
//p.then(baz,oopsBaz);










