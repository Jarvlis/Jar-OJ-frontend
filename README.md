# Jar-OJ-frontend
Jar-OJ项目前端部分


## 快速上手:

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### 根据后端接口, 快速生成前端API
```shell
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
```

### 项目时序图
(消息队列暂时未加入项目中, 过阵子会将RabbitMQ加入, 并且增设C++ 、 Python 、 JavaScript语言支持， 最后将项目改造为微服务)
![yuque_diagram](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/2ee5d5d9-d69a-4408-83a9-f385a9aee039)


### 项目待扩展点
- 消息队列暂时未加入项目中, 过阵子会将RabbitMQ加入
- 并且增设C++ 、 Python 、 JavaScript语言支持
- 最后将项目改造为微服务
- 增设更多用户友好型提示（如在做题页面即可浏览到做题结果）
- 根据输入的题目分析判题数据图
- 我的注销和个人做题分析页面
