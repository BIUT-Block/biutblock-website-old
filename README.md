# doracms 2.0.0



## 说明



## 目录结构

```
├─build // webpack 相关配置文件
│
├─dist  // webpack 生成文档存放目录
│  │
│  ├─server
│  │
│  └─static
│      ├─css
│      │
│      ├─images
│      │
│      ├─img
│      │
│      └─js
│
├─server    // 服务端目录
│  │
│  ├─api    // api 相关处理文件
│  │
│  ├─config // api 配置文件
│  │
│  ├─models // mongoose 的相关 model
│  │
│  ├─routes // 路由文件
│  │
│  └─utils  // 实用工具
│
├─src           // 客户端程序目录
│  │
│  ├─api        // api 配置文件
│  │
│  ├─assets     // 静态文件文件夹
│  │  ├─css
│  │  │
│  │  └─images
│  │
│  ├─components // 组件文件夹
│  │
│  ├─filters    // 过滤器
│  │
│  ├─pages      // 路由组件
│  │
│  ├─polyfill   // polyfill
│  │
│  ├─router     // 路由配置文件夹
│  │
│  ├─store      // vuex 相关文件夹
│  │  │
│  │  └─modules // vuex 模块文件夹
│  │
│  ├─template   // 初始模版
│  │
│  └─utils      // 实用工具
│
└─static
    ├─editor.md
    │
    ├─images

```





## 准备工作:
安装 NodeJS:
https://nodejs.org/zh-cn/

安装 Mongodb:
https://www.mongodb.com/download-center#community

```shell
# 安装依赖
$ npm install

# 开发模式
$ npm run dev

# 生产模式
$ npm run build

# 启动(需先生成静态文件)
$ npm run start
```

首页
http://localhost:8080

登录
http://localhost:8080/dr-admin

# LICENSE

MIT
