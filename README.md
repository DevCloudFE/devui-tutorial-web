
## DevUI tutorial web

### 技术
* Angular8.x
* ng-devui组件
* echarts、markd、codemirror

### 启动开发

```shell
npm start #默认端口4200
```
#### 构建

```shell
npm run build
```

### lint

```shell
npm run lint
```

### 代理配置
本地开发通过proxy配置http请求到 3000端口的server端

### postinstall
[fix generating es5 bundles error ,count not find plugin "proposal-numeric-separator"](http://github.com/angular/angular-cli/issues/17262)