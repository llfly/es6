//gate 等待多个并行／并发的任务都完成才能继续

var p1 = new Promise((resolve, reject)=>
    setTimeout(() => resolve(console.log('p1')), 2000)
);

var p2 = new Promise((resolve, reject)=>
    setTimeout(() => resolve(console.log('p2')), 3000)
);

Promise.all([p1,p2])
.then(msg =>
	new Promise((resolve,reject)=>
		setTimeout(() => resolve(console.log('p1 p2 all done')), 1000)
	)
)
.then(msg=>console.log('done'));
// p1
// p2
// p1 p2 all done
// done

//传给all的数组中的值可以是promise,thenable，甚至是立即值
//本质上讲，列表中每个值都会通过Promise.resolve过滤，以确保要等待的是一个真正的Promise