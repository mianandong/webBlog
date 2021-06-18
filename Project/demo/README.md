# React Hook 实战 -- 函数组件渲染优化

影响组件渲染的因素
- props
- state
- context

```
state变化引起的re-render是我们意料之中的
但props和context一些场景下的变化会引起组件不必要的re-render
下面我们分析这些场景并尝试使用react内置的hook来解决这些问题，以优化函数组件的渲染
```

## 基调：如何判断一个组件re-render了（即触发ComponentDidUpdate）
### 自定义Hook
使用`useEffect` + `useRef`自定义`hook`  
详见`usePrintComponentState.js`

## 从props角度列举场景并优化
### 1.Child组件不传递任何参数

> Child没有发生任何变化，为什么会重新更新??
### 2.使用useMemo解决子组件重复渲染的问题
类似于React.PureComponent, 会对组件的props进行浅比较(===)

### 3.Parent传递对象类型的参数给到Child
- Parent定义一个state对象
- Parent将此state对象传递给Child
- Child显示其state信息
- Parent重新渲染，但不修改state对象

Child并不会重新渲染  
因为Child使用memo封装，且参数对象为同一引用并未修改
### 4.Parent传递对象类型的参数给到Child---值相同但不是同一引用
- Parent定义一个state对象
- Parent将此state对象传递给Child，使用`{...info}`方式传参
- Child显示其state信息
- Parent重新渲染，但不修改state对象

Child会重新渲染  
使用`{...info}`每次都会生成一个新的对象。  
memo使用的是浅比较(===)。

### 5.Parent传递对象类型的参数给到Child---值相同但不是同一引用---使用memo优化
- 给Child中memo第二个参数提供回调

```js
function memo<P extends object>(
    Component: SFC<P>,
    propsAreEqual?: (prevProps: Readonly<PropsWithChildren<P>>, nextProps: Readonly<PropsWithChildren<P>>) => boolean
): NamedExoticComponent<P>;
```
Child不会重新渲染  
memo的第二个参数提供了类似于shouldComponentDidUpdate的功能

### 6.Parent传递回调函数参数给到Child
- Parent在函数组件内部定义一个函数
- 将此函数传递给Child
- Child无需调用此函数

Child会重复渲染。  
是因为父组件每次重新render后，都会得到一个新的函数

### 7.Parent传递回调函数参数给到Child---使用useCallback优化
- Parent定义的函数使用useCallback进行封装

Child不会重复渲染。  
使用useCallback，可以减少函数类型传参引起的不必要渲染

### 8.Parent传递多余参数给到Child
- Parent传递的参数Child未使用
- Parent修改此参数

Child会重复渲染。  
不要传递多余的参数给到子组件

## 从context角度列举场景并优化
### 9.使用useContext获取context数据
现在我们的逻辑大致就是
- 在App.js中定义全局数据及修改全局数据的方法
- 在其他子组件中通过useContext获取数据

这样设计的问题：
- 即使子组件只用到了context中的部分数据，且此部分数据没有改变，当context其他部分的数据修改时，依旧会造成子组件re-render
- 如果添加了一个数据或数据修改的方法，需要在多处进行修改（散弹式修改）

### 10.使用useReducer+useContext模拟实现redux

### 11.使用redux + react hook
