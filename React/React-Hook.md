## 为什么会出现React Hook
在react hook出现之前，一些逻辑特别简单的组件(没有state，不需要关注生命周期等逻辑)，我们会使用函数组件来实现。
后来人们为了在复杂场景下也能使用函数组件实现，就发明了react hook,来弥补之前的函数组件没有state，生命周期回调等问题。
比如：
```
useState用来创建state  
useEffect用来注册生命周期回调函数  
useRef用来获取组件自身DOM
```
## 优点
在react hook之前，复用的粒度是`Component`，多通过高阶组件来实现。  
在react hook之后，复用的粒度是`state`，通过调用hook就可复用state的逻辑。  
比如：  

定义一个逻辑可复用的state: mounted
```js
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // 当组件didMount时，该函数会被调用
    setMounted(true);
  }, []);
  return mounted;
};
```
使用该hook
```js
const Footer = () => {
  const mounted = useMounted();
  if (mounted) {
      console.log('component did mount);
  }
  return <div>test</div>;
};

```
当你想定义一个state来判断组件是否挂载了，直接调用useMounted即可。  

## 更新逻辑

在react hook模式下，函数组件的渲染受哪些方面影响？
组件的数据来源
- props传参，从父组件获得数据
- useContext，从context中获得数据
- useState，自身管理的数据

数据类型
- 基本类型
- 对象类型

1. 当与组件渲染不相关的数据改变时，不要引起组件的重新渲染。
2. 当与组件渲染相关的数据改变时，可以进行对象深对比，即使是不同对象，但是只要属性值没变，也不要引起组件的重新渲染。
以上两点是我们期望达到的效果

## 如何判断函数组件重新渲染了？
首先，我们要定下一个规则，就是如何判断函数组件重新进行了渲染。
```js
const useComponentDidMount = () => {
    const mounting = useRef(true);
    useEffect(() => {
        if (mounting.current) {
            console.log('component did mount');
            mounting.current = false;
        } else {
            console.log('component did update');
        }
    })
}
```

## demo代码
我们主要有三个组件
```xml
<App>
    <Child1>
        <Child2>
        </Child2>
    </Child1>
</App>
```

### 示例1
> 非常单纯的使用函数组件不进行任何处理

代码：
```js
useDidMount.js
import { useEffect, useRef } from "react";

export const useComponentDidMount = (name) => {
    const mounting = useRef(true);
    useEffect(() => {
        if (mounting.current) {
            console.log(`${name} component did mount.....`);
            mounting.current = false;
        } else {
            console.log(`${name} component did update========`);
        }
    })
}
```
```js
App.js
const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const onBtnClick = () => {
    setNum(num + 1);
  }

  return (
    <div className="App">
      {num}
      <button onClick={onBtnClick}>点击+</button>
      <Child1></Child1>
    </div>
  );
}

export default App;
```
```js
Child1.js
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

export const Child1 = () => {
    useComponentDidMount('Child1');
    return (
        <div>
            child1
            <Child2></Child2>
        </div>
    );
};
```
```js
Child2.js
import { useComponentDidMount } from "./hook/useDidMount";

export const Child2 = () => {
    useComponentDidMount('Child2');
    return (
        <div>
            child2
        </div>
    );
};
```
操作：  
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update======== 
```
分析：
```
父组件重新render，会造成子组件的重新render，即使没有给子组件任何传参
```

### 示例2
> 使用React.memo改造Child1，解决上面的问题

代码：
```js
Child1.js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = () => {
    useComponentDidMount('Child1');
    return (
        <div>
            child1
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did update========
App component did update========
App component did update========
```
分析：
```
父组价重新渲染，使用React.memo对子组件包装一层，可以防止`纯子组件`也会重新渲染的问题
```

### 示例3
> App传递基本类型参数num、age给Child1，Child1只使用age不使用num
> 且点击App按钮时，age值一直保持不变，num值变化

代码：
```js
App.js
import { useState } from 'react';
import './App.css';
import { Child1 } from './Child1';
import { useComponentDidMount } from './hook/useDidMount';

const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const onBtnClick = () => {
    setNum(num + 1);
  }

  return (
    <div className="App">
      {num}
      <button onClick={onBtnClick}>点击+</button>
      <Child1 num={num} age="18"></Child1>   // 修改了此行
    </div>
  );
}

export default App;
```

```js
Child1.js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1:{props.age}  // 修改了此行
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update======== 
```
分析：
```
父组件给子组件传递基本类型的参数，即使子组件没有使用该参数，也会造成子组件的重新渲染.
所以这告诉我们，不要多余传递子组件没有使用的参数
```

### 示例4
> 改造child1解决上面的问题

代码：
```js
Child1.js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1:{props.age}
            <Child2></Child2>
        </div>
    );
};
// 主要修改就是给memo提供了第二个参数
export const Child1 = memo(Temp, (pre, next) => {
    if (pre.age === next.age) {
        return true;
    }
    return false;
});
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did update========
App component did update========
App component did update========
```
分析：
```
可以使用memo的第二个参数来决定props是否相等，从而减少不必要的render
```
### 示例5
> 给App上添加一个对象类型的state，同时将该对象传递给Child1

代码：
```js
import { useState } from 'react';
import './App.css';
import { Child1 } from './Child1';
import { useComponentDidMount } from './hook/useDidMount';

const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const [student, setStudent] = useState({
    name: 'xuwei',
    age: 20
  });

  const onAddAgeClick = () => {
    setStudent({
      ...student,
      age: student.age+1
    })
  }

  const onBtnClick = () => {
    setNum(num+1);
  }

  return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={student}></Child1>
    </div>
  );
}

export default App;
```

```js
CHild1.js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did update========
App component did update========
App component did update========
```
分析：
```
Child1中的React.memo会对对象类型的参数进行浅比较，从而较少不必要的render
```

### 案例5
> App传递给Child1的对象值相同，但是非同一引用

代码：
```js
import { useState } from 'react';
import './App.css';
import { Child1 } from './Child1';
import { useComponentDidMount } from './hook/useDidMount';

const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const [student, setStudent] = useState({
    name: 'xuwei',
    age: 20
  });

  const onAddAgeClick = () => {
    setStudent({
      ...student,
      age: student.age+1
    })
  }

  const onBtnClick = () => {
    setNum(num+1);

    // 添加了此段逻辑，没有修改属性值，但是会返回一个新的对象
    setStudent({
      ...student
    })
  }

  return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={student}></Child1>
    </div>
  );
}

export default App;
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update======== 
```
分析：
```
Child1中的React.memo会对对象类型的参数进行浅比较，即使属性值相等，不是同一对象引用，也会重新渲染
```
### 示例6
> 改造Child1中的memo

代码：
```js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp, (pre, next) => {
    if (pre.student.name === next.student.name && pre.student.age === next.student.age) {
        return true;
    }
    return false;
});
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did update========
App component did update========
App component did update========
```

### 示例7
> Child1的memo不传递第二个参数，同时给Child1传参时采用...

代码：
```js
return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={{ ...student}}></Child1>   // 修改了此行
    </div>
  );
```

结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update========
```
结论：
```
...返回的是新的对象，所以如果不对Child1做处理的话，他是一定会重新渲染的.
其实不仅...，如果使用 value={{name, age}}，这样也会返回一个新的对象
```
## 小结

对于会被其他组件引用的子组件，一定要使用React.memo进行封装，不然如果父组件重新渲染，子组件也一定会重新渲染。  
React.memo会进行如下操作
- 如果参数是基本类型，进行判等
- 如果参数是对象类型，判断是否为同一对象的引用，且是否改变

如果为true，则不会重新渲染，反之。  

同时，我们还要对memo函数提供第二个参数，这主要是为了处理参数是对象类型的情况。即使对象的属性值都相同，但是如果不是同一引用，memo默认会重新render。通过第二个参数，我们可以自定义比较规则。

## 下面说一下参数为函数的情况

### 示例1
> 给子组件传递的参数是已定义的函数


```js
App.js
const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const [student, setStudent] = useState({
    name: 'xuwei',
    age: 20
  });

  const onAddAgeClick = () => {
    setStudent({
      ...student,
      age: student.age+1
    })
  }

  const onBtnClick = () => {
    setNum(num+1);
  }

  return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={student} addNum={setNum}></Child1> // 给子组件传递参数为函数
    </div>
  );
}
```
```js
Child1.js
const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);  // 不提供第二个参数
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
App component did update========
App component did update======== 
```
分析：
```
App给子组件传递的是state的setXxxx函数，不会造成子组件的重新渲染
```

### 示例2
> 给子组件传递匿名函数

代码：
```js
App.js
return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={student} addNum={() => {console.log('zzzzz')}}></Child1>  // 修改了此行
    </div>
  );
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update========
```
分析：
```
App给子组件传递匿名函数，每次产生的都是新的对象，所以会引起子组件的重新渲染
```

### 示例3
> 给子组件提供自定义函数

代码：
```js
const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const [student, setStudent] = useState({
    name: 'xuwei',
    age: 20
  });

  const onAddAgeClick = () => {
    setStudent({
      ...student,
      age: student.age+1
    })
  }

  const onBtnClick = () => {
    setNum(num+1);
  }

  // 增加了此函数
  const test = () => {
    console.log('sssss');
  }

  return (
    <div className="App">
      App: num: {num}======name: {student.name}======age: {student.age}
      <button onClick={onAddAgeClick}>增加年龄</button>
      <button onClick={onBtnClick}>点击+</button>
      <Child1 student={student} addNum={test}></Child1>  // 修改了此行
    </div>
  );
}
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update========
```
分析：
```
由于App重新渲染了，所以定义的test会变成一个新的变量，从而造成子组件的重新渲染。
```
### 案例4
> 解决上面的问题

代码：
```js
const test = useCallback(() => {
    console.log('sssss');
}, []);

return (
<div className="App">
    App: num: {num}======name: {student.name}======age: {student.age}
    <button onClick={onAddAgeClick}>增加年龄</button>
    <button onClick={onBtnClick}>点击+</button>
    <Child1 student={student} addNum={test}></Child1>
</div>
);
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
App component did update========
App component did update========
```
分析：
```
使用useCallback可以缓存自定义函数，从而减少子组件不必要的render
```

## 下面说一下 useContext与useReducer相结合的情况
代码：
```js
App.js
import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import { Child1 } from './Child1';
import { useComponentDidMount } from './hook/useDidMount';

const initState = {
  "logo": "BMW",
  "color": "red"
}

const reducer = (state, action) => {
  switch (action.type) {
    case "change-logo":
      return {
        ...state,
        logo: action.data.logo
      }
    case "change-color":
      return {
        ...state,
        color: action.data.color
      }
    default:
      return state;
  }
}

export const AppContext = React.createContext(initState);

const App = () => {
  useComponentDidMount('App');
  const [num, setNum] = useState(0);

  const [ state, dispatch ] = useReducer(reducer, initState);

  const [student, setStudent] = useState({
    name: 'xuwei',
    age: 20
  });

  const onAddAgeClick = () => {
    setStudent({
      ...student,
      age: student.age+1
    })
  }

  const onBtnClick = () => {
    setNum(num+1);
  }

  const test = useCallback(() => {
    console.log('sssss');
  }, []);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div className="App">
        App: num: {num}======name: {student.name}======age: {student.age}
        <button onClick={onAddAgeClick}>增加年龄</button>
        <button onClick={onBtnClick}>点击+</button>
        <Child1 student={student} addNum={test}></Child1>
      </div>
    </AppContext.Provider>
  );
}

export default App;
```

```js
Child1.js
import { memo } from "react";
import { Child2 } from "./Child2";
import { useComponentDidMount } from "./hook/useDidMount";

const Temp = (props) => {
    useComponentDidMount('Child1');

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```
现在单纯的点击按钮 点击+ ,不会引起子组件的渲染
### 示例1
> Child1调用了useContext，但是没有使用其值

```js
const Temp = (props) => {
    useComponentDidMount('Child1');
    const {state, dispatch} = useContext(AppContext); // 添加了此行

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}=====
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child2 component did update========
Child1 component did update========
App component did update========
Child2 component did update========
Child1 component did update========
App component did update========
```
分析：
```
向AppContext中放置数据的方式为 value={{state, dispatch}}
所以当App组件重新渲染时，value会赋值为一个新的对象(即使state对象为同一引用)，从而造成所有调用了useContext的组件重新渲染。
```
### 案例2
> 解决上面子组件重复渲染的问题

代码：
```js
export const AppContext = React.createContext(initState);
export const DispatchContext = React.createContext();

return (
    <AppContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="App">
          App: num: {num}======name: {student.name}======age: {student.age}
          <button onClick={onAddAgeClick}>增加年龄</button>
          <button onClick={onBtnClick}>点击+</button>
          <Child1 student={student} addNum={test}></Child1>
        </div>
      </DispatchContext.Provider>
    </AppContext.Provider>
  );
```

```js
const Temp = (props) => {
    useComponentDidMount('Child1');
    const state = useContext(AppContext);
    const dispatch = useContext(DispatchContext);

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}=====
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```
操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
App component did update========
App component did update========
```
分析：
```
state及dispatch分别保存在两个context中
子组件分别从两个context中获取state及dispatch
```

### 案例3
> dispatch修改state
> Child1 useContext获取了state及dispatch
> Child2 useContext只获取了dispatch

代码：
```js
App.js
  const onBtnClick = () => {
    dispatch({
      type: 'change-color',
      data: {
        color: 'green'
      }
    })
  }
```
```js
Child1.js
const Temp = (props) => {
    useComponentDidMount('Child1');
    const state = useContext(AppContext);
    const dispatch = useContext(DispatchContext);

    return (
        <div>
            child1====name: {props.student.name}=======age: {props.student.age}=====
            <Child2></Child2>
        </div>
    );
};

export const Child1 = memo(Temp);
```

```js
Child2.js
const Temp = () => {
    useComponentDidMount('Child2');
    const dispatch = useContext(DispatchContext);

    return (
        <div>
            child2
        </div>
    );
};

export const Child2 = React.memo(Temp);
```

操作：
```
点击按钮++
```
结果：
```
Child2 component did mount.....
Child1 component did mount.....
App component did mount.....
Child1 component did update========
App component did update========
Child1 component did update========
App component did update========
```
分析：
```
Child2没有重新渲染，符合我们的预期
```
### 案例4
> 案例1的问题，也可以这样解决

```js
index.js
export const Wrapper = ({ children }) => {
  useComponentDidMount('Index');
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById('root')
);
```

```js
  return (
      <div className="App">
        App: num: {num}======name: {student.name}======age: {student.age}
        <button onClick={onAddAgeClick}>增加年龄</button>
        <button onClick={onBtnClick}>点击+</button>
        <Child1 student={student} addNum={test}></Child1>
      </div>
  );
```

结论：
```
就是将store放置在最顶层容器
```

### 案例5
> 基于redux，实现部分context中的属性变化时子组件才进行更新

