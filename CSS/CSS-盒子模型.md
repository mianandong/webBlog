## 概念
```
所有HTML元素都可以看作盒子。
一个盒子由外到内可以分成四个部分：外边距、边框、内边距、content（内容）。
可以通过margin、border、padding这三个属性来控制盒子的这三个部分。而content则是HTML元素的内容。

不同部分的说明：
Margin(外边距) - 清除边框外的区域，外边距是透明的。
Border(边框) - 围绕在内边距和内容外的边框。
Padding(内边距) - 清除内容周围的区域，内边距是透明的。
Content(内容) - 盒子的内容，显示文本和图像。
```

## 元素的宽高
```css
您指定一个 CSS 元素的宽度和高度属性时，你只是设置内容区域的宽度和高度。
要知道，完整大小的元素，你还必须添加内边距，边框和外边距。

实例
div {
    width: 300px;
    border: 25px solid green;
    padding: 25px;
    margin: 25px;
}

让我们自己算算：
300px (宽)
+ 50px (左 + 右填充)
+ 50px (左 + 右边框)
+ 50px (左 + 右边距)
= 450px
```

## box-sizing
```
上面说到的是【默认】情况下的计算方法，另外一种情况下，width和height属性设置的就是盒子的宽度和高度。
盒子的宽度和高度的计算方式由box-sizing属性控制。

box-sizing属性值取值：
content-box：默认值，width和height属性分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距、边框、外边距。
border-box：为元素设定的width和height属性决定了元素的边框盒。
就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
通过从已设定的宽度和高度分别减去【边框】和【内边距】才能得到内容的宽度和高度。
inherit：规定应从父元素继承box-sizing属性的值。

当box-sizing：content-box时，这种盒子模型成为标准盒子模型。
当box-sizing: border-box时，这种盒子模型称为IE盒子模型。
```

## 参考资料
```
CSS盒子模型总结_码厩-CSDN博客_css盒子模型  
https://blog.csdn.net/qq_34966814/article/details/82872971
```
