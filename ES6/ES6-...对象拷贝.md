const stu = {
​	name: 'xxx',
​	school: {
​		name: 'ssss',
​		address:  'www'
​	}
}

const shallowStu = {...stu}


对于基本类型： 比如name属性，两个对象之间是相互独立的

对于对象类型： 比如school属性，两个对象之间共享同一个引用

reactjs - In Redux, is it necessary to do deep copy - Stack Overflow
https://stackoverflow.com/questions/43151622/in-redux-is-it-necessary-to-do-deep-copy