## 合并代码
除了`git pull` 更推荐使用 `git pull --rebase`

```
git pull          =  git fetch + git merge FETCH_HEAD 
git pull --rebase =  git fetch + git rebase FETCH_HEAD 
```
![](2021-05-31-10-05-52.png)
![](2021-05-31-10-06-14.png)


---

## --amend
```
git commit -a --amend

-a 指所有的更改
--amend 将更改添加到最近一个提交中

效果: 可将当前修改添加到最后一次commit中，并且还能重新编辑commit信息
```
## rebase
```js
git rebase -i HEAD~3
git rebase -i 69f6da8dca9421eca19cd0daceecca433262917b

-i  表示用交互式方式打开
```
![](2021-05-31-16-53-17.png)
执行结果如上图，点击i可进行编辑，对每个commit进行操作。
其执行的大致逻辑为：
```
当我们保存退出编辑器的时候，git会将其从历史记录中删除列表中的所有这些提交
然后再重新依次执行每一行，根据我们对每一个提交指定的命令进行操作。
```



