var gimmeSomething = (function(){
    var nextVal;

    return function(){
        if(nextVal === undefined){
            nextVal = 1;
        }else{
            nextVal = (3 * nextVal) + 6;
        }
        return nextVal;
    }
})();

gimmeSomething();


//计算属性名 + Symbol + for..of
var something = (function(){
    var nextVal;

    return {
        //for ..of循环需要
        [Symbol.iterator]:function(){return this},
        //标准迭代器接口方法
        next:function(){
            if(nextVal === undefined){
                nextVal = 1;
            }else{
                nextVal = (3 * nextVal) + 6;
            }
            return {done:false,value:nextVal};//done标识迭代器完成状态
        }
    }
})();

something.next().value;

for(var v of something){
    console.log(v);
    if(v > 500){
        break;
    }
}
//1 9 33 105

//丑陋
for(var ret; (ret = something.next())&& !ret.done;){
    console.log(ret.value);
    if(ret.value>500){
        break;
    }
}

// for(var k of Object.keys(obj))
//for .. in  包含[[Prototype]]

//iterable  可迭代
//for .. of 循环自动调用它的Symbol.iterator函数来构建一个迭代器
var a = [1,3,5,7,9];
var it = a[Symbol.iterator]();
it.next().value;
it.next().value;
it.next().value;

