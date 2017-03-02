//门闩 竞态
p1 = new Promise((resolve, reject) =>
    setTimeout(() =>
    	resolve(console.log('p1')), 2000));

p2 = new Promise((resolve, reject) =>
    setTimeout(() =>
    	resolve(console.log('p2')), 3000));

p3 = new Promise((resolve, reject) =>
    setTimeout(() =>
    	resolve(console.log('p3')), 5000));

var p = Promise.race([p1,p2,p3]);

p.then(()=>{
    console.log('p');
});// p1 p p2 p3;

//传入空数组，主race Promise永远不会决议



// 超时竞赛
setTimeoutPromise = delay =>
	new Promise((resolve,reject)=>
		setTimeout(()=>
			reject('Timeout!'),delay)
	);

Promise.race([p3,setTimeoutPromise(3000)])
.then(()=>conosl.log("done!"),err=>console.log(err))




















