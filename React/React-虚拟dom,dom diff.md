## 虚拟DOM
```js

所谓虚拟DOM，就是用JS的object对象模拟DOM中的真实节点对象。
再通过特定的render方法将其渲染成真实的DOM节点

当ReactDOM.render被调用时，底层调用React.createElement，返回以下对象：

<div className='cn'>
  Content 1!
  <br />
  Content 2!
</div>

// There are more fields, but these are most important to us
{
  type: 'div',
  props: {
    className: 'cn',
    children: [
      'Content 1!',
      'Content 2!'
    ]
  }
}
这些对象，在React的角度上，构成了虚拟DOM。
```

## diff算法
```
DOM Diff就是比较两个虚拟DOM的区别，本质上就是对比两个对象的区别。

React更新组件不是从头开始创建所有DOM节点并将其放在页面上，
而是根据虚拟DOM对象的属性，来确定节点树的哪些部分必须更新，哪些可以保持不变。
主要有以下几种场景：
```

### 1. type是一个字符串，且值不变，props也没有改变。
```js
// before update
{ type: 'div', props: { className: 'cn' } }

// after update
{ type: 'div', props: { className: 'cn' } }

这是最简单的情况：DOM保持不变。
```

### 2. type仍然是相同的字符串，props是不同的。
```js
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'div', props: { className: 'cnn' } }

type仍然是相同元素，React知道如何通过标准DOM API调用来更改元素的属性，而无需从DOM树中删除一个节点。
```

### 3. type已更改为不同的String
```js
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'span', props: { className: 'cn' } }
React看到的type是不同的，会将old元素和它的所有子节点一起删除（unmounted卸载）。
因此，将元素替换为完全不同于DOM树的东西代价会非常昂贵。幸运的是，这在现实世界中很少发生。

划重点，记住React使用 ===（triple equals）来比较type的值，所以这两个值需要是相同类或相同函数的相同实例。
```

## 应用
```js
我们已经知道了react更新组件的逻辑，那我们是不是可以做一些优化减少组件不必要的卸载挂载呐，答案肯定是可以的。

大家都挺喜欢用HOC的，高阶组件是一个将组件作为参数，执行某些操作，最后返回另外一个不同功能的组件：
function withName(SomeComponent) {
  // Computing name, possibly expensive...
  return function(props) {
    return <SomeComponent {...props} name={name} />;
  }
}

这是一种常见的模式，但你需要小心。如果我们这么写：

class App extends React.Component() {
  render() {
    // Creates a new instance on each render
    const SomeComponentWithName = withName(SomeComponent);
    return <SomeComponentWithName />;
  }
}

我们在父节点的render方法内部创建一个HOC。当我们重新渲染（re-render）树时，虚拟DOM是这样子的：

// On first render:
{
  type: SomeComponentWithName,
  props: {},
}

// On second render:
{
  type: SomeComponentWithName, // Same name, but different instance
  props: {},
}

虽然同名，但引用了不同的实例，因此全等比较（triple equal）失败，一个完整的re-mount会发生（整个节点换掉）。

解决办法：
// Creates a new instance just once
const SomeComponentWithName = withName(Component);

class App extends React.Component() {
  render() {
    return <SomeComponentWithName />;
  }
}

同时，我们应该尽量避免使用如下形式给组件传参

<Table
    // map返回数组的新实例，因此浅比较将失败
    rows={rows.map(/* ... */)}
    // 对象字面量总是与前任“不同”
    style={ { color: 'red' } }
    // 箭头函数总是新生成一个实例
    onUpdate={() => { /* ... */ }}
/>
```

## 总结
```
学习React组件的更新逻辑，可以帮助我们写出性能更高的代码，减少组件不必要的卸载和挂载。
```

## 参考文章
```
https://segmentfault.com/a/1190000015366521
```