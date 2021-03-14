## 总结
```
React Hook之前，为了复用一段逻辑或者组件，都是通过 render props 或者高阶组件来达到复用，但这会带来嵌套过多的问题，
使我们的代码难于理解和维护，所以React官方提出了原生支持代码逻辑复用的方案：React Hook。

React Hook，新增了 state hook 和 effect hook 函数，借助这两个hook，我们可以把class组件中的state对象，
分割成若干个函数进行管理和更新，而这些函数就是最小的可复用单元。
```

## 原理
```
要知道的背景是：
1. hook的调用顺序要一致
2. 
```