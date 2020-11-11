# 1作用域
js也是编译语言，但不是提前编译的，而是到运行时前才编译。
编译通常分为3个步骤：
1. tokenizing/lexing 分词/语法分析
2. Parsing 解析/语法分析 将词法单元转换成一个由元素逐级嵌套而成的程序语法结构树（AST）。
3. 代码生成 将AST转换成可执行的代码

作用域定义：严格规范了所有声明的标志符（变量），在当前作用域下，代码对他们的访问权限。

var a = 2
当进行RHS查询（即查询谁是该赋值操作的源头；获取目标变量的值）时，但对该值进行了不合理的操作，是会抛出TypeError的。

当进行LHS查询（查询该变量容器本身，用于被赋值；获取目标变量）；
如果未声明过该变量，是会抛出ReferenceError的

ReferenceError通常是和作用域判别错误相关，typeError则是作用域判断对了，但对其操作不合法。

严格模式下，禁止自动或者隐式的创建变量
// use strict

# 2词法作用域
词法作用域意味着 作用域 是由书写代码的时候，有函数声明的位置来决定的。
编译词法分析阶段基本就可以知道全部标识符在哪里，以及在哪里声明，
从而判断在执行的过程中如何对他们进行查找。

# 3 函数作用域和块作用域
js是具有基于函数的作用域的。
通过函数包裹，可以隐藏某些变量。
利用let 可以显式的声明变量

# 4 任何声明在某个作用域内的变量，都附属于这个作用域。
变量的声明是会被提升的，赋值则保持在原先的位置不变。
然后函数和变量相比 函数首先被提升。

# 5 作用域 闭包 

通过一定手段，将内部函数传递到其所在词法作用域以外，它都是会持有原先定义作用域的引用。
因此，无论在何处执行该函数，都会使用这个闭包。

js的模块 module通过暴露自己内部的一些方法，实现闭包。
-1 模块模式必须要有外部的封闭函数，该函数必须至少要被调用一次。
    因为没调用一次就会创建一个新的模块实例
-2 封闭的这个函数必须至少返回一个内部的函数，这样该返回的内部函数就可以在别的作用域里形成闭包，
通过该函数实现访问或者修改闭包内变量。

另外 一个具有函数属性的对象  object 并不算是闭包。

import 可以把模块中的API导入到当前作用域中。并分别绑定到一个变量上。
export 会将当前模块的一个标志符导出为公共api
module会将整个模块的api导入并绑定到一个变量上。
```js
// bar.js
function hello(){
  console.log('hello')
}

export hello
```
```js
// foo.js
import hello from 'bar'

var myhungry = 'hippo'
function awsome() {
  console.log('ye')
  hello()
}

export awsome
```
```js
module foo from 'foo'
module bar from 'bar'

bar.hello()
foo.awsome()
```

当函数可以记住并访问所在的词法作用域，即使在当前作用域之外执行，
也是可以的，这样也就产生了闭包。

js具有词法作用域 不具有动态作用域。
词法作用域的特征是 变量定义过程是发生在代码书写阶段，而非动态的。

动态则是关系函数在何处调用，所以无法直接确定。

剪头函数 => 遇上this的时候，和普通函数行为不一样。
它放弃了普通this的绑定规则，用当时写代码处的词法作用域覆盖了this本来的值。

遇到问题不要回避，去试图解决。

this是在运行的时候绑定的，不在编写时绑定，它的上下文环境
就取决于调用时候的环境和条件了。
this的绑定和函数声明的位置没什么关系，只取决于函数的调用方式。

比如说，函数被调用的时候，会创建一个类似的调用记录。
包含了该函数在哪里被调用（调用栈），函数的调用方法啊，传入的各种参数等。
重点在于函数的调用方式、调用时候的位置（也叫调用方法）。从而来判断。

重点也就变成了分析调用栈，即为了达到当前执行位置所调用的所有函数。
这个调用位置就是 当前正在执行的函数的 **前一个** 调用中。

调用栈就像一个函数调用链。

接下来是this的绑定规则：
- 1 默认绑定
    这种情况就是指向全局作用域
- 2 隐藏式绑定
    需要考虑调用的具体位置处是否有context上下文，是否被某个对象拥有或者包含。
    调用时候具体指向。
    同样，隐藏式的绑定存在丢失现象，会应用默认绑定情况。
    比如回调函数
- 3 显示绑定
    强制在某个对象上调用函数，
    比如 call apply。
    但
- 4 new方式绑定
    首先是new调用所会执行的操作
    //
    1 创建一个空对象
    2 该空对象会被执行 原型 的连接
    3 这个空对象会绑定到函数调用的this
    4 如果函数没有返回其他对象，new表达式中的函数调用会自动返回这个新对象。
    
this绑定优先级 
 new，指向新创建的对象。
 显示绑定 call apply，只想传入的对象
 隐式绑定 如果是否在某个上下文里被对象调用了
 都不是，则是默认绑定

还有一种忽略的情况，即把null undefined作为this传入call apply 或者bind，
这时候调用会忽略掉。应用了默认的绑定规则。
有可能出现问题，就是在第三方库里。

所以建议传入一个 Object.create(null)对象，这个对象比{}还要空，
他没有Object.prototype这个委托。

但是箭头函数不一样，不使用这些规则
它的this直接就是指向所写代码外层的作用域，new也不能修改。

最常用在回调函数里，比如事件处理器，定时器。

总结就是：
 找某个运行函数内this的指向时，需要先找到该函数的直接调用位置（作用域），
 找到了后应用 this的四种规则判断 this的绑定对象。
 但箭头函数例外，有静态代码的外层函数决定了。
 
## 3 对象

函数调用位置不同，this绑定的对象不同，对象的含义是？

函数并不会属于某个对象，只是在对象内部对函数进行了引用，调用。

深 浅复制概念：

深复制方法：

1. JSON.stringfy 将对象转换为 json 格式的字符串
    JSON.parse是 将json 字符串转换为 对象的
    json格式的字符串
    {‘a’: 5, '}
    1. let fun = JSON.parse(JSON.stringfy(obj))

2. ES6还有Object.assign()实现浅复制
利用的就是 = 这个符号
```js
obj = {
a: 2
}

let obj2 = Object.assign({}, obj)

obj2.a === obj.a
// true
```

ES6 有属性描述负查看
```js
Object.getOwnPropertyDescriptor(obj, 'a')

// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }

let myObj = {}

Object.defineProperty(myObj, 'a', {
  value: 10,
  writable: true,
  configurable: true,
  enumberable: true
})

console.log(myObj.a)
// 10
一般也不会这样去修改描述符
```

writable用来控制是否可更改
configurable用来控制是否可配置
enumberable查看是否可以枚举 出现在for in循环中


是否可枚举，可以用


in操作符可以检测属性是否在对象及其prototype原型链中，
然后 hasOwnProperty只会检测是否在 对象 上，不会检测到原型链上。
Object.prototype.hasOwnProperty.call(obj, 'a')来检查是毕竟稳妥的。
注意 这里检测的都是key
```javascript
Object.defineProperty(obj, 'b', {
  enumberable: false,
  value: 3
})
Object.defineProperty(obj, 'a', {
  enumberable: true,
  value: 2
})
obj.propertyIsEnumberable('a') // true

Object.keys(obj) // ['a']  获取所有键，包含所有可枚举的属性
Object.getOwnPropertyNames(obj) // ['a','b'] 获取所有键，包括不可枚举的

```
现在有 forEach, some, every 可以遍历数组

## 类
多态 继承 

构造函数：初始化实例时 会提供所需要的信息。


