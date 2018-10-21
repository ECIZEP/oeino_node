# 博客技术重构第二版

第一版技术栈：vue-ssr + RESTful api + express + mongodb

第二版技术栈：

* 前端： c端前台vue-ssr 不使用ui框架   B端后台 vue-spa  muse-ui一款material design UI框架

* 后端：typescript  node框架nest.js  mysql+ typeorm+graphql

后端有计划使用golang提供相关rpc 接口，mysql和orm层使用golang实现，node 通过 thrift rpc 调用，node负责服务端渲染以及graphql http接口。

Client 地址：github.com/ECIZEP/oeino_client

B端后台地址： github.com/ECIZEP/oeino_dashboard

Node server:   github.com/ECIZEP/oeino_node