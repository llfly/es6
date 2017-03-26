function agrv(obj,...keys){
    var res = Object.create(null);

    for(var i = 0; i < keys.length;i++){
        res[key[i]] = obj[keys[i]];
    }
    return res;
}

var data = {title:'es6',name:'name'};

var msg = agrv(data,"title","name");

console.log(msg.title);