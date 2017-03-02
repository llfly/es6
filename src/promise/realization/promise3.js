'use strict';
function Promise(fn){
	let value = null,
		deferreds = [],
		state = 'pending',
		handle = (deferred)=>{
			if(state == 'pending'){
				deferreds.push(deferred);
				return;
			}
			var ret = deferred.onFulfilled(value);
			deferred.resolve(ret);
		},
		resolve = (newValue)=>{
			if(newValue && typeof newValue === 'objcet' || typeof newValue === 'function'){
				var then = newValue.then;
				if(typeof then === 'function'){
					then.call(newValue,resolve);
					return;
				}
			}
			state = 'fulfilled';
			value = newValue;
			setTimeout(()=>deferreds.forEach(deferred=>handle(deferred)),0);
		};


	this.then = onFulfilled => new Promise(resolve=>handle({onFulfilled,resolve}))

	fn(resolve);
}


new Promise(resolve=>{
	setTimeout(()=>{
		console.log('timeout done!');
		resolve();
	},3000);
}).then(()=>{
	return new Promise(function (resolve) {
		setTimeout(()=>{
			console.log('1 timeout then');
			resolve();
		})
	},4000);
}).then(()=>{
	return new Promise(function (resolve) {
		setTimeout(()=>{
			console.log('2 timeout then');
			resolve();
		})
	},1000);
}).then(()=>{
	console.log('3 timeout then');
})