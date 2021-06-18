### React.memo
- 只针对props进行比较
- 可以减少re-render的场景
  - 父组件不给子组件传参
  - 父组件给子组件传递基本类型的参数
  - 父组件给子组件传递同一引用对象
- 提供第二个参数可以减少re-render的场景
  - 父组件给子组件传递对象不是同一引用，但是value相同

### React.useCallback
- 封装函数，返回相同示例，减少re-render

### useSelector + useDispatch
