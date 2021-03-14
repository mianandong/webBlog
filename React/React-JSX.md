## 概念
```
JSX是javascript语法的扩展，实现了javascript的全部功能。
```

## 为什么要使用JSX
```
WPF的MVVM模式，将View(视图) Model(模型) ViewModel(视图模型)
该模式充分利用了WPF的数据绑定机制，最大限度地降低了Xmal文件和CS文件的耦合度，也就是UI显示和逻辑代码的耦合度。
如需要更换界面时，逻辑代码修改很少，甚至不用修改。

React 并没有采用将渲染与逻辑进行分离到不同文件这种人为地分离方式，
而是通过将二者共同存放在称之为“组件”的松散耦合单元之中。
```

## 原理
```js
Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```