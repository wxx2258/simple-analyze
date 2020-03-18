function co(fn) {
    return function(done) {
        const ctx = this;
        const gen = fn.call(ctx);
        let it = null;
        function _next(err, res) {
            if(err) res = err;
            it = gen.next(res);
            //{value:function(){},done:false}
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}

function read(file){
    return (fn)=>{
        fs.readFile(file,'utf8',fn)
    }
}

const gen=function *(){
    const b=yield read('error.js')
    console.log(b.length)

    const c=yield read('package.json')
    console.log(c.length)
}

co(gen)()