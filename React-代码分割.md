### 打包
```
打包是一个将文件引入并合并到一个【单独文件】的过程，最终形成一个“bundle”。
接着在页面中引入该bundle，整个应用即可一次性加载。
```

### 代码分割
```
打包是一个非常棒的技术，但随着你应用的增长，你的bundle也将随之增长。
我们要避免因体积过大而导致加载时间过长。

代码分割是个不错的选择，代码分割是由诸如Webpack,Rollup这类【打包器支持的一项技术】
能够创建多个包并在运行时动态加载。

进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。
【尽管并没有减少应用整体的代码体积】，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。
```

## 代码分割的几种方式
### import()
```
使用之前：

import { add } from './math';
console.log(add(16, 26));

使用之后：

import("./math").then(math => {
  console.log(math.add(16, 26));
});

当然，你要对打包器进行代码分割的配置。
```
### React.lazy
```
React.lazy通常与 import，Suspense组件配合使用

import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
fallback 属性接受任何在组件加载过程中你想展示的 React 元素。
```
### 基于路由的代码分割
```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```





