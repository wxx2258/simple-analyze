### promise
解决异步地狱回调以及异常处理

### 代码实现
* Promise 是一个构造函数，接收一个函数，函数里有两个参数，resolve、reject。
    * 其中需要一个status，保存状态
    * 以及执行成功结果或者失败结果的变量
    * 执行器的参数是resolve和reject，同样也是函数，功能是有结果后触发缓存回调数组。

``` JavaScript
class Promise () {
    constructor (executor) {
        // 变量声明
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        // 结果成功，通知函数定义
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved'
                this.value = value
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        // 结果失败，通知函数定义
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
}
```

### Promise.then 的实现
1. then订阅功能
    * promise实例只有通过then函数调用的时候才会拿到结果，then 函数参数分别为成功回调和失败回调，回调参数为成功值和失败值。固 then 函数的主要功能即是缓存回调函数，也可以理解为订阅。
2. then返回promise
3. then多次调用
    * then 可以多次调用，且每次then参数 onFulFilled函数的参数值为上一次promise函数的执行结果。
4. 状态不可逆
5. promise.then异步执行
    * 使用setTimeout异步执行回调
6. promise.then穿透

### 其他方法实现
1. promise.resolve
2. promise.reject
3. promise.all
4. promise.race
5. Promise.promisify

### 资料参考
* https://juejin.im/post/5b5180a46fb9a04fb212ab73