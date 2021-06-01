外层div容器宽度固定，ul宽度随li（li宽度固定）的增加而撑开，但是当ul中li的宽度之和大于div时，ul没有撑开，而是li换行了，如何使li不换行？

解决方法：主要是外面容器设置为white-space：nowrap；li设置为display：inline-block；而不是float：left；

<!DOCTYPE html>
<html>
<head>
<style>
 
#pic_list
{
display:block;
width:500px;
white-space:nowrap;  // import 
overflow:auto; // import
}
#pic_list li
{
width:80px;
height:80px;
margin:3px;
background:red;
display:inline-block; // import
}
</style>
 
</head>
<div id="pic_list">
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
</body>
</html>