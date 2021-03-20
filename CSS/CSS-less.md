### 变量
```css
@width: 10px;
@height: @width + 10px;
#header {
  width: @width;
  height: @height;
}

编译为：

#header {
  width: 10px;
  height: 20px;
}
```

### 混合
```
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}

which results in:
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}

注意点：
1.实践发现，混合时，展开父类的样式，位置不同，造成的效果截然相反~
```

### 嵌套
```
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}

用 Less 语言我们可以这样书写代码：
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

### 伪类
```
a {
  color: blue;
  &:hover {
    color: green;
  }
}

results in:
a {
  color: blue;
}
a:hover {
  color: green;
}
```

### 在less中 & 是连接符的作用
```
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
  &-custom {
    background-image: url("custom.png");
  }
}

output:
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}

注意点：
.button内部的样式不会被继承(其他的嵌套层级其实也都不会继承)。所以大家都是怎么使用的呐？

<Button className={`button ${isOk? 'button-ok' : ' '}`}>
在原有class的基础上添加className，等同于添加了&-ok内部的属性
```


### 函数
```
@some: foo;
div {
    margin: if((2 > 1), 0, 3px);
    color:  if((iscolor(@some)), @some, black);
}

Result:
div {
    margin: 0;
    color:  black;
}


@bg: black;
@bg-light: boolean(luma(@bg) > 50%);
div {
  background: @bg;
  color: if(@bg-light, black, white);
}

Result:
div {
  background: black;
  color: white;
}
```

### 映射
```
@sizes: {
  mobile: 320px;
  tablet: 768px;
  desktop: 1024px;
}
.navbar {
  display: block;
  @media (min-width: @sizes[tablet]) {
    display: inline-block;
  }
}

Outputs:
.navbar {
  display: block;
}
@media (min-width: 768px) {
  .navbar {
    display: inline-block;
  }
}
```

### 作用域
```
@var: red; 
#page { 
    @var: white;     
    #header { 
        color: @var; // white 
    } 
}
```

### 导入
```
@import "library"; // library.less
@import "typo.css";
```
