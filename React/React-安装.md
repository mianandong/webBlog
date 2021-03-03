```
我们知道了React的核心概念之后，如何在代码中引用React呐？
```

### CDN链接
```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

react.development.js 导出的方法如下所示：
  exports.Children = Children;
  exports.Component = Component;
  exports.PureComponent = PureComponent;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals$1;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = ReactVersion;
  
react-dom.development.js 导出的方法如下所示：
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals;
  exports.createPortal = createPortal$1;
  exports.findDOMNode = findDOMNode;
  exports.flushSync = flushSync;
  exports.hydrate = hydrate;
  exports.render = render;
  exports.unmountComponentAtNode = unmountComponentAtNode;
  exports.unstable_batchedUpdates = batchedUpdates$1;
  exports.unstable_createPortal = unstable_createPortal;
  exports.unstable_renderSubtreeIntoContainer = renderSubtreeIntoContainer;
  exports.version = ReactVersion;
```

```html
test.html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      class MyButton extends React.Component {
        render() {
          return React.createElement('button', {}, 'Hello');
        }
      }
      
      const domContainer = document.getElementById('root');
      ReactDOM.render(React.createElement(MyButton), domContainer);
    </script>
  </body>
</html>

我们使用了React.Component,React.createElement,ReactDOM.render等React库定义的方法
用浏览器打开test.html即可。
```

### 尝试使用JSX
```
通过上面test.html例子，我们成功运用React库在页面渲染出一个按钮。
我们使用的是纯JavaScript代码，React还提供了一种使用JSX来替代实现的选择
```
```javascript
  <body>
    <div id="root"></div>
    <script>
      class MyButton extends React.Component {
        render() {
          return (
            <button>hello</button>
          );
        }
      }
      
      const domContainer = document.getElementById('root');
      ReactDOM.render(<MyButton />, domContainer);
    </script>
  </body>
```
```
显然，使用JSX的方式编写UI代码更方便。 
但是浏览器原生并不支持JSX语法，在项目中尝试 JSX 最快的方法是在页面中添加这个 <script> 标签

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
```html
完整代码如下所示：

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      class MyButton extends React.Component {
        render() {
          return (
            <button>hello</button>
          );
        }
      }
      
      const domContainer = document.getElementById('root');
      ReactDOM.render(<MyButton />, domContainer);
    </script>
  </body>
</html>

一定要注意：
在 <script> 标签内使用 JSX，要为其添加 type="text/babel" 属性。
只有添加这个属性，babel才知道它需要去处理这个脚本。
```

### Create React App
https://github.com/facebook/create-react-app

```
一组JavaScript构建工具链通常由这些组成：

一个package管理器， 比如 npm 或 yarn 。 它能让你充分利用庞大的第三方 package 的生态系统，并且轻松地安装或更新它们。
一个打包器，        比如 webpack 或 Parcel。它能让你编写模块化代码，并将它们组合在一起成为小的 package，以优化加载时间。
一个编译器，        比如 Babel。它能让你编写的新版本 JavaScript 代码，在旧版浏览器中依然能够工作。
```
```
Create React App 已经帮你把这些都准备好了。
```




