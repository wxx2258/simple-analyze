class VueRouter {
    constructor(Vue, options) {
        this.$options = options;
        this.routeMap = {};
        this.app = new Vue({
            data: {
                current: '#/'
            }
        });
        this.init();

        this.createRouteMap(this.$options);
        this.initComponent(Vue);
    }
    init() {
        window.addEventListener('load', this.onHashChange.bind(this), false);
        window.addEventListener('hashchange', this.onHashChange.bind(this), false);
    }
    onHashChange() {
        this.app.current = this.getHash();
    }
    // 获取当前hash串
    getHash() {
        return window.location.hash.slice(1) || '/';
    }
    // 创建映射表
    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
        });
        console.log('routeMap', this.routeMap);
    }
    // 初始化路由组件’
    initComponent(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            template: '<a :href="to"><slot></slot></a>'
        });
        const _this = this;
        Vue.component('router-view', {
            render(h) {
                const component = _this.routeMap[_this.app.current];
                console.log('component: ', component);
                return h(component);
            }
        })
    }
}