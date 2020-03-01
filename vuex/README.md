### 简单实现思路
1. 使用Vue创建一个store实例，使其 state 数据变为响应式数据。
2. 通过全局 Vue.mixins 将 store 数据在 beforeCreated 时放到子组件实例中 。

### 详细实现
#### 一、完成最简单的通过vuex定义全局变量，在任何一个界面都可以获取到
1. 通过vue.mixins在beforeCreated前混入 this.$store
2. 给 this.


#### 二、vuex的getter方法实现
1. 遍历 getter 对象
2. 注册 getter，通过 Object.defineProperty() 劫持 get ，则调用 getter 属性函数，传参 state ，获取数据

#### 三、mutation和commit方法的实现
1. 遍历 mutation 对象
2. 注册 mutation，通过 Object.defineProperty() 劫持 get，get 回调利用 .call 绑定 this 和传参
3. 实现 commit 方法，调用 `this.mutations[type]()`

#### 四、actions和dispatch方法的实现
实现思路和mutation相似


#### 五、module的实现


### 资料参考
[用150行代码实现Vuex 80%的功能](https://juejin.im/post/5c62ea95e51d457ffe60c084)