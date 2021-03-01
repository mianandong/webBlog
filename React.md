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





