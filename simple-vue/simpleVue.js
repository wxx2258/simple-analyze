class Vue {
    constructor(options = {}){
        this.$el = document.querySelector(options.el);
        let data = this.data = options.data; 
        // 代理data，使其能直接this.xxx的方式访问data，正常的话需要this.data.xxx
        Object.keys(data).forEach((key)=> {
            this.proxyData(key);
        });
        this.methods = options.methods // 事件方法
        this.watcherTask = {}; // 需要监听的任务列表
        this.observer(data); // 初始化劫持监听所有数据
        this.compile(this.$el); // 解析dom
        console.log(this.watcherTask)
    }
    proxyData(key) {
        // 数据代理
        let that = this;
        Object.defineProperty(that, key, {
            configurable: false,
            enumerable: false,
            get() {
                return that.data[key];
            },
            set(newVal) {
                that.data[key] = newVal;
            }
        })
    }
    observer(data) {
        // 劫持监听所有的数据
        let that = this
        Object.keys(data).forEach(key=>{
            let value = data[key]
            this.watcherTask[key] = []
            Object.defineProperty(data,key,{
                configurable: false,
                enumerable: true,
                get(){
                    return value
                },
                set(newValue){
                    if(newValue !== value){
                        value = newValue;
                        // 批量更新视图
                        that.watcherTask[key].forEach(task => {
                            task.update();
                        })
                    }
                }
            })
        })
    }
    compile(el) {
        // 解析dom
        var nodes = el.childNodes;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if(node.nodeType === 3){
                // node.nodeType === 3 的意思是当前元素是文本节点
                var text = node.textContent.trim();
                if (!text) continue;
                this.compileText(node,'textContent')
            }else if(node.nodeType === 1){
                // node.nodeType === 1 的意思是当前元素是元素节点
                if(node.childNodes.length > 0){
                    // 如果当前元素还有子节点，继续递归调用
                    this.compile(node);
                }
                if(node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){
                    node.addEventListener('input',(()=>{
                        let attrVal = node.getAttribute('v-model');
                        this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,'value'))
                        node.removeAttribute('v-model')
                        return () => {
                            this.data[attrVal] = node.value
                        }
                    })())
                }
                if(node.hasAttribute('v-html')){
                    // 如果当前节点上有 v-html 指令，就进行发布订阅
                    let attrVal = node.getAttribute('v-html');
                    this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,'innerHTML')); // 将订阅的数据 push  到 watcherTask 里面
                    node.removeAttribute('v-html');
                }
                this.compileText(node, 'innerHTML');
                if(node.hasAttribute('@click')){
                    let attrVal = node.getAttribute('@click')
                    node.removeAttribute('@click')
                    node.addEventListener('click',e => {
                        this.methods[attrVal] && this.methods[attrVal].bind(this)()
                    })
                }
            }
        }
    }
    compileText(node, type) {
        // 解析dom里处理纯双花括号的操作
        let reg = /\{\{(.*?)\}\}/g, txt = node.textContent;
        if(reg.test(txt)){
            node.textContent = txt.replace(reg,(matched,value)=>{
                let tpl = this.watcherTask[value] || []
                tpl.push(new Watcher(node,this,value,type))
                if(value.split('.').length > 1){
                    let v = null
                    value.split('.').forEach((val,i)=>{
                        v = !v ? this[val] : v[val]
                    })
                    return v
                }else{
                    return this[value]
                }
            })
        }
    }
}
class Watcher{
    constructor(el,vm,value,type){
        this.el = el;
        this.vm = vm;
        this.value = value;
        this.type = type;
        this.update()
    }
    update(){
        // 更新视图
        this.el[this.type] = this.vm.data[this.value]
    }
}