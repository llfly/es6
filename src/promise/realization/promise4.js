function Promise(fn) {
	var state = 'pending',
			value = null,
			deferreds = [];

	this.then = function (onFulfilled, onRejected) {
		return new Promise(function (resolve, reject) {
			handle({
				onFulfilled: onFulfilled || null,
				onRejected: onRejected || null,
				resolve: resolve,
				reject: reject
			});
		});
	};

	function handle(deferred) {
		if (state === 'pending') {
			deferreds.push(deferred);
			return;
		}

		var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
				ret;
		if (cb === null) {
			cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
			cb(value);
			return;
		}
		ret = cb(value);
		deferred.resolve(ret);
	}

	function resolve(newValue) {
		if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
			var then = newValue.then;
			if (typeof then === 'function') {
				then.call(newValue, resolve, reject);
				return;
			}
		}
		state = 'fulfilled';
		value = newValue;
		finale();
	}

	function reject(reason) {
		state = 'rejected';
		value = reason;
		finale();
	}

	function finale() {
		setTimeout(function () {
			deferreds.forEach(function (deferred) {
				handle(deferred);
			});
		}, 0);
	}

	fn(resolve, reject);
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