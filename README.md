## 简介
爬取豆瓣杭州租房小组帖子信息，输入需要查询的地段，查询到信息后展示到前端页面。

## 使用方法
1. 将项目克隆到本地
```git
git clone git@github.com:Pegggy/creeper-nodejs.git
```

2. 安装依赖
```git
npm install
```

3. 启动
```git
npm start
```
在浏览器窗口中打开 [http://localhost:3000](http://localhost:3000)即可使用。

## 提醒
1. node.js 版本需支持 es7语法中的 async 和 await(本例 node 版本为8.4.0）。
2. 受豆瓣反爬虫策略影响，短时间内提交次数过多可能会造成IP被封，出现403错误，正常浏览不会出现该情况。
