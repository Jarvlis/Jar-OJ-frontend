# Jar-OJ-frontend
Jar-OJ 前端部分

🚀 前端基于 Vue 3 + Arco Design + TypeScript 搭建的在线判题系统。系统可根据管理员发布的题目和预设的判题用例，将用户提交的代码执行与评测。

🚀 后端基于 Java8 + SpringBoot + MyBatis-Plus + Docker 搭建的在线判题系统。系统提供了单独调用自主实现的代码沙箱的接口，系统可根据管理员发布的题目和预设的判题用例，将用户提交的代码执行与评测。

后端github链接：[https://github.com/Jarvlis/Jar-OJ-backend](https://github.com/Jarvlis/Jar-OJ-backend)

代码沙箱github链接：[https://github.com/Jarvlis/JarOJ-code-sandbox](https://github.com/Jarvlis/JarOJ-code-sandbox)


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

![yuque_diagram (1)](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/8e640a87-3798-40b0-a0ba-ab7afc38eb91)

### 项目展示
登录页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/2aaa8df0-2054-449d-8960-f7c79297bf28)

注册页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/46e2b9de-3041-4f9d-a062-99874e8e8341)

题目页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/509cf672-2dff-4921-ba8d-ea279e55e1c0)

做题页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/2ce63970-3798-410a-a780-1782c310d114)

题目提交页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/544af9dc-b92e-4699-8614-a1dbb0329391)


管理题目页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/9c0bbf95-e4e1-45b9-9c31-b8324421999c)


创建题目页面

![image](https://github.com/Jarvlis/Jar-OJ-frontend/assets/96105888/a1fa2cbe-a4d2-4e35-bec4-0cf45aaf2d66)


### 项目待扩展点
- 消息队列暂时未加入项目中, 过阵子会将RabbitMQ加入
- 并且增设C++ 、 Python 、 JavaScript语言支持
- 最后将项目改造为微服务
- 增设更多用户友好型提示（如在做题页面即可浏览到做题结果）
- 根据输入的题目分析判题数据图
- 我的注销和个人做题分析页面
- 做题目前仅支持args模式，可以扩展acm模式和力扣模式
