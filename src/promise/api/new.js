if(!Promise.observe){
	Promise.observe = (pr,cb)=>{
		pr.then(
			msg=>Promise.resolve(msg).then(cb),
			err=>Promise.resolve(err).then(cb)
			);
		return pr;
	}
}


// Promise.race([
// 	Promise.observe(foo(),msg=>{
// 		//
// 	}),
// 	timeoutPromise(3000)
// 	]);


//none([]) 所有的Promise都要被拒绝，即拒绝转化为完成值，反之亦然。
//any([]) 只需要完成一个而不是全部。
//first([]) 只要第一个Promise完成，它就会忽略后续的任何拒绝和完成。

//所有都reject 主Prmise reject
if(!Promise.first){
	Promise.first = prs =>
		new Promise(
			(resolve,reject)=>
				prs.forEach(pr=>
					Promise.resolve(pr).then(resolve)
				)
		)
}

//last([]) 只有最后一个完成胜出。


//并发迭代
if(!Promise.map){
	Promise.map =(vals,cb)=>
		Promise.all([
			vals.map(val=>
				new Promise(resolve=>
					cb(val,resolve)
				))
		])
}


var p1 = Promise.resolve(21);
var p2 = Promise.resolve(42);
var p3 = Promise.reject('Oops');

Promise.map([p1,p2,p3],(pr,done)=>
	Promise.resolve(pr)
		.then(v=>done(v*2),done)
)
.then(vals=>console.log(vals));











//wrap
if(!Promise.wrap){
	Promise.wrap = fn =>
		()=>{
			var args = [].slice.call(arguments);
			return new Promise((resolve,reject)=>
				fn.apply(
					null,
					args.concat((err,v)=>{
						if(err)
							reject(err);
						else
							resolve(v);
					})
					)
			)
		}
}

// var request = Promise.wrap(ajax);
// request(url).then(...)

