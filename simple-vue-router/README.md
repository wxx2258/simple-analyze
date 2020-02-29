### 实现思路
1. 绑定 hashchange 事件，实现前端路由；
2. 将传入的路由和组件做一个路由映射，切换哪个路由即可找到对应的组件显示；
3. 需要 new 一个 Vue 实例还做响应式通信，当路由改变的时候，router-view 会响应更新；
4. 注册 router-link 和 router-view 组件。

### 前端路由
#### 什么是前端路由
1. 改变url且不让浏览器向服务器发送请求
2. 可以监听到 url 的变化

#### hash模式
* 主要思路是通过监听 hashChange 和 load
``` javascript
window.location.hash = 'hash字符串'; // 用于设置 hash 值

let hash = window.location.hash; // 获取当前 hash 值

// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(event){ 
    let newURL = event.newURL; // hash 改变后的新 url
    let oldURL = event.oldURL; // hash 改变前的旧 url
},false)
```
#### history模式
* 主要思路：
    * history.replaceState() 替换当前历史栈内容
    * history.pushState() 
    * window.onpopstate() 监听历史记录条目回调事件
    * 全局重新定义a标签点击行为，阻止默认行为，改为 history 对象操作



### 资料参考
* [实现一个简单路由](https://juejin.im/post/5b35dcb5f265da59a117344d)
* [前端路由](https://juejin.im/post/5d2d19ccf265da1b7f29b05f)