## React
### JSX  
```
JSX是JavaScript语法的扩展
const element = <h1 className="test">hello world!</h1> 即定义了一个元素。
Babel编译后为：
const element = React.createElement('h1', {className: test}, 'hello world!');
实际转换成：
const element = {
  type: 'h1',
  props: {
    className: 'test',
    children: 'hello world!'
  }
};

所以我们通过JSX定义一个元素底层实际调用的是React.createElement方法，最终生成一个对象。
```
### ReactDOM
```
负责将React元素渲染成相应的DOM结构
ReactDOM.render(element, document.getElementById('root'));
```
#### ReactDOM更新元素的一大特点就是：`只更新它需要更新的部分`
```
React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。
```
### 函数组件
```
函数组件，因为它本质上就是 JavaScript 函数。

function Welcome(prop) {
  return <h1>hello, {props.name}!</h1>
}
```
### class组件
```
与函数组件是等价的
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
### 渲染组件
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));

这段代码会在页面上渲染 “Hello, Sara”
React 调用 Welcome 组件，并将 {name: 'Sara'} 作为 props 传入

const element = <Welcome name='Sara' />; 等价于
const element = Welcome({name: 'Sara'});
```
注意点：
1.  `组件名称必须以大写字母开头`
2.  name="xxx" 非 name: "xxx"
3.  参数基本类型必须是string 比如 age="12"
4.  `组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props, 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改`

### 组合组件
```
function Welcome(props) {
  return <h1>Hello {props.name}</h1>
}

function App() {
  return (
    <Welcome name="xiaohong">
    <Welcome name="xiaohei">
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 组件的生命周期
```
以时钟为例，写一个class组件
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

函数调用顺序是：
ReactDOM.render -> Clock.constructor -> Clock.render -> Clock.componentDidMount -> Clock.setState -> Clock.render
```
### 正确使用State
1. `不要直接修改State`, this.state.content = "xxx"，不会重新渲染组件
2. 而是应该使用setState({content: 'xxxx'})
3. 构造函数是唯一可以给this.state赋值的地方

### State的更新是异步的
```
出于性能考虑，React会把多个setState()调用合并成一个调用。
所以当你的setState依赖于上一个state的值时是不可靠的，比如来说：
this.state.count = 1;
function add() {
  this.setState({
    count: this.state.count + 1;
  });
}

当你连续两次调用add()方法时，你以为this.state.count为3，但实际可能为2
当你第一次调用add()时，{count: 1 + 1}
当你第二次调用add()时，由于state的更新是异步的，此时{count: this.state.count + 1} 中的this.state.count可能仍为1

React内部应该是维护了一个待更新队列，当我们调用setState，传入的参数是一个对象时，React会把该对象（不可变）放入到队列中等待更新，
当第二次调用add()时，放入队列的对象可能仍为{count: 2}

那如何解决这个问题呐？
我们可以向待更新队列中放入回调函数，也就是调用setState时传入的参数是一个函数.
这样React只有在真正更新组件的时候，才会执行该回调函数，此时函数执行拿到的一定是最新的值。
function add() {
  this.setState(() => {
    count: this.state + 1
  });
}
```

### 何时使用函数组件\class组件？
```
当组件是无状态的时候，适合使用函数组件
当组件是有状态的时候，适合使用class组件
```
### React数据是向下流动的
怎么理解这句话呐，就是父组件可以给子组件传参，但是子组件无法传参给父组件，所以数据总是一层一层向子组件流动的。  
这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。  
`如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。`

### React组件的事件处理
```
传统的 HTML：
<button onclick="activateLasers()">
  Activate Lasers
</button>

在 React 中
<button onClick={activateLasers}>
  Activate Lasers
</button>

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
```

### JSX中的this
```你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。
如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。
```









