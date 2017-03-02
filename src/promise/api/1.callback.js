//加验证的callback 丑陋

/*
function fetchX(fn){
	setTimeout(()=>fn(10),2000);
}
function fetchY(fn){
	setTimeout(()=>fn(20),1000);
}


function add(getX,getY,cb){
	var x,y;
	getX(function(xVal){
		x = xVal;
		if(y != undefined){
			cb(x + y);
		}
	});
	getY(function(yVal){
		y =yVal;
		if(x != undefined){
			cb(x + y);
		}
	})
};

add(fetchX,fetchY,function(sum){
	console.log(sum);
});
*/


//promise

/*
const fetchX = ()=>new Promise((resolve,reject)=>setTimeout(()=>resolve(10)),2000);
const fetchY = ()=>new Promise((resolve,reject)=>setTimeout(()=>resolve(20)),1000);


const add = (xPromise,yPromise)=>{
	return Promise.all([xPromise,yPromise])
	.then(values=>values[0]+values[1],err=>console.log(err));
};
add(fetchX(),fetchY()).then(sum=>console.log(sum));
*/



//---------------------------------------------------//

//使用回调的话，通知就是任务调用的回调
//foo完成后，通知它的回调(推)


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



//使用Promise的话，侦听来自foo(...)的事件，然后在得到通知的时候，根据情况继续(拉)
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














