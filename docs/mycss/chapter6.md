# 流的破坏和保护

[TOC]

### float
浮动的本质是为了实现文字环绕的效果。

float有以下一些属性需要注意：
- 包裹性
- 块状化并格式化上下文
- 破坏文档流
- 没有任何的margin合并

#### 包裹性
如果浮动元素的子元素小于浮动元素的父容器宽度，
那浮动元素就是子元素的宽度，呈现包裹性。
```html
<style>
  .father{
    width: 200px;
  }
  .float{
    float: left;
    img{
      width: 128px;  
    }
  }
</style>
<body>
  <div class="father">
    <div class="float">
      <img src="" alt=""> 
    </div>
  </div>
</body>
```

- 自适应性 
如果里面不知一张图片，还有文字，那么浮动元素会自适应父元素的200px

另外，浮动会让元素块状化

另外text-align对块状化元素是无效的。

行框盒子和浮动元素不可重叠性。如果行框盒子和浮动元素垂直高度又重叠，
则行框盒子再正常定位下智慧跟随浮动元素，不会重叠。

浮动的参考有两个，一是“浮动锚点float anchor“ 二是”浮动参考float reference”
anchor指的是float元素所在流中的一个点，点本身不浮动，像是一个没有margin padding border的空内联元素

reference指的是浮动元素相对齐参考的实体。

但float可以通过clear清除

```css
clear: none | left | right | both
```
是通过设置clear属性的元素自身如何如何，而不是让float元素怎样。
基本就是clear: both 或 none
clear属性是让自身不能与前面的浮动元素相邻，但对该元素后面的不管。

clear属性只有块级元素才有， ::after伪元素默认是内联的，故通常通过这种方式清除浮动。

clear:both本质是让自己不和float元素一行，并不是特别完美的方式。

建议BFC block formatting context

块级格式化上下文

BFC内部元素怎么折腾都不会影响到外部。BFC元素是不会发生margin合并 的。
BFC可以清除浮动，因为加入子元素浮动了，到种子父元素高度塌陷，那就会影响到外部。

触发条件：
    1. html根元素
    2. float不是none 的值
    3. overflow 为auto，scroll，hidden。
    4. display为table-cell，table-caption，或者inline-block。
    5. position不是relative或static。
    
实际上BFC用途不是去margin或者清除float，而是实现自适应布局。
bfc容错性强，自适应的内容会自动填充满浮动以外的区域。
适合两栏布局。

```html
.bfc{
  width: 300px
}
.left{
  float: left;
  margin-right: 10px;
  border-right: 10px solid transparent;
  padding-right: 10px
}
.right{
  overflow: hidden;
  border-left: 10px solid transparent;
  padding-left: 10px;
<!--  margin-left: 130px  不举荐，因为这个值需要浮动元素的宽度加上我们想要的间隙值，每次改都要计算-->
}
<div class="bfc">
    <img class="left" />
    <p class="right">文字。。。</p>  
</div>
```
理论上bfc元素和float元素相遇就可以自动填充成自适应布局。

但不是上述的属性都适合改元素为bfc的，建议如下
- overflow: auto/hidden ie7 and so on
- display: inline-block ie6 and ie7
- display: table-cell ie8 and so on

举荐overflow:hidden，因为最大程度不会影响其他元素的宽度。
只是会可能剪裁掉部分内容。

剪裁的是border-box的内边缘。

这里有个额外的内容，就是设置overflow hidden了，
容器垂直方向可滚动，chrome下的padding-bottom会计算在内，
firefox和ie不会，所以应当注意避免padding-bottom

ie8之后多了 **overflow-x** 和 **overflow-y**，用于控制水平和垂直方向上的剪裁规则。

属性和overflow一样。
visible： 默认
hidden：剪裁
scroll：滚动区域一直在
auto：不足以滚动时没有滚动条，可以滚动就出现。

永远不可能实现一个方向溢出剪裁或滚动，另一方向内容溢出显示的效果。
scroll、auto 和 hidden 这 3 个属性值是可以共存的。

pc端，无论什么浏览器，默认滚动条均来自html标签，而非body；
chrome去除默认滚动条，并禁止滚动。但在移动端不适用。
```css
html { 
  overflow: hidden; 
} 
```
隐藏滚动条，可以滚动.
```css
html {
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
  -ms-overflow-style:none;
  /*火狐下隐藏滚动条*/
  overflow:-moz-scrollbars-none;
    }
/*Chrome下隐藏滚动条，溢出可以透明滚动*/
html::-webkit-scrollbar{width:0px}
```

文字过多显示省略号
```css
.ell {
 text-overflow: ellipsis;
 white-space: nowrap;
 overflow: hidden;
} 
```

还有最多显示两行的
```css
.ell-rows-2 {
 display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
} 
```

overflow与锚点

可以借助锚点实现定位，方式有两种：
- <a>标签以及name属性
- 使用标签的id属性 
```html
<a href="#1"></a>
<a name="1"></a>
```
定位的本质原理就是改变 **容器** 滚动高度或者宽度。
是container 容器的滚动高度。
但单页面应用spa
本身#是作为锚点的，如果路由已占用了，那么会冲突。

建议使用id会更加干净一点
锚点定位的触发条件：
1.URL地址种的锚链与锚点对应  且  有交互行为
2.可focus的锚点元素处于focus状态

但第一种是会让元素定位到浏览器窗体的上边缘，
第二种事让focus元素出现在浏览器可视范围内。

本质就是让容器的滚动条滚动一定距离
```javascript
  document.querySelector('.container').scrollTop = 400
  // 让容器滚动一定距离即可，可以很大的一值
```
然后结合overflow: hidden可以隐藏滚动条,实现一直切换显示的效果；
比如轮播图结合focus，可以用input框，:checked伪类，单选按钮，label标签实现切换。

```css
  .containerid{
    height: 120px;
    overflow: hidden;
    width: 300px;
  }
  .box{
    height: 200px;
  }
```
```html
    <div class="containerid">
       <div class="box">s</div>
       <a id="1">zzzzz</a>
    </div>
       <a href="#1">mmmmm</a>
```

float的兄弟position: absolute
absolute存在的时候float无效。
都能块状化，包裹性，破坏性。


## !6.5.1先跳过

