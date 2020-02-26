## 项目介绍
### 项目运行
```
node ./lib/index.js
```

### 目录
* /lib ：webpack简单实现代码
* /src ：示例代码
* /dist ：打包目录
* /simplepack.config.js ：打包配置文件

### 流程实现

1. constructor，创建内部属性entry、output、modules（模块数组）
2. 钩子 run ：
    * 首先执行 buildModule 构建模块，获取入口文件的构建模块，包含 模块依赖数组（bable-traverse） 和 通过AST（babylon和bable-core） 转换后的 polyfill 代码
    * 遍历和递归 入口文件的依赖数组，将其添加到 this.modules 属性中

3. 钩子emitFile：
    * 通过 function (require, module, exports) 将 modules 中得模块打包代码拼接在一起，再将其放入 内部实现好 自执行 函数。

``` javascript
(function(modules) {
    function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
    }P

    require('${this.entry}');
})({${modules}})
```

### 打包后的实例代码

``` javascript
(function (modules) {
  function require(fileName) {
    const fn = modules[fileName];

    const module = {
      exports: {}
    };

    fn(require, module, module.exports);

    return module.exports;
  }

  require('/Users/wuxiaoxin/Desktop/my-learn/webpack/geektime-webpack-course/code/chapter06/simple-webpack/src/index.js');
})({
  '/Users/wuxiaoxin/Desktop/my-learn/webpack/geektime-webpack-course/code/chapter06/simple-webpack/src/index.js': function (require, module, exports) {
    "use strict";

    var _greeting = require("./greeting.js");

    document.write((0, _greeting.greeting)('Jane'));
  },
  './greeting.js': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.greeting = greeting;

    function greeting(name) {
      return 'hello' + name;
    }
  },
})
```
