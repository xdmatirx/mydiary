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

#### absolute绝对定位
absolute是非常独立的css属性，不依赖其他样式、属性可以完成

利用position absolute完成了很多定位效果，但比较适合静态的页面；
如果是二级菜单的定位显示的或者其他动态的，还是用js比较好。

无论是内联元素还是块状元素，使用position: absolute前位置在哪里，使用后仍在同一位置。

但是浮动和绝对定位遇上时，有一些奇怪的问题。

```html
<h4>全兼容版本</h4>
<p class="compa"><img src="1.jpg"></p>
```
```css
p {
    width: 300px; height: 120px;
    background-color: #eef0f6;
    text-align: center;
}
img {
    position: absolute;
}

/* IE兼容处理 */
.compa {
    font-size: .1px;
    font-size: -webkit-calc(1px - 1px);
}
.compa:before {
    content: "\2002";
}
```
可以实现图片前面的空白幽灵节点的居中，再给一个margin-left一半图片宽度负值大小即可图片居中。

如果
overflow 不是定位元素，同时绝对定位元素和 overflow 容器之间也没有定位元素，则
overflow 无法对 absolute 元素进行剪裁。

```html
<div style="overflow: hidden;">
 <img src="1.jpg" style="position: absolute;">
</div>
//overflow 元素父级是定位元素也不会剪裁，例如：
<div style="position: relative;">
 <div style="overflow: hidden;">
 <img src="1.jpg" style="position: absolute;">
 </div>
</div> 
```

但是，如果 overflow 属性所在的元素同时也是定位元素，里面的绝对定位元素会被剪裁：
<div style="overflow: hidden; position: relative;">
 <img src="1.jpg" style="position: absolute;"> <!-- 剪裁 -->
</div>
如果 overflow 元素和绝对定位元素之间有定位元素，也会被剪裁：
<div style="overflow: hidden;">
 <div style="position: relative;">
 <img src="1.jpg" style="position: absolute;"> <!-- 剪裁 -->
 </div>
</div>
如果 overflow 的属性值不是 hidden 而是 auto 或者 scroll，即使绝对定位元素高宽
比 overflow 元素高宽还要大，也都不会出现滚动条。例如，下面的 HTML 和 CSS 代码：

```html
<div class="box">
 	<img src="1.jpg">
</div>
```

```css
.box {
 width: 300px; height: 100px;
 background-color: #f0f3f9;
 overflow: auto;
}
.box > img {
 width: 256px; height: 192px;
 position: absolute;
} 
```

图片高度 256px 比容器.box 高度 100px 明显高出了一截，但是，没有滚动条出现。
实际开发的时候，绝对定位元素和非绝对定位元素往往可能混杂在一起，虽然绝对定位元
素不能让滚动条出现，但是非绝对定位元素可以，于是，就可能出现另外一种很有特色的现象，

### clip属性，但想要起作用，需要元素得是绝对定位或者固定定位
即position为absolute或则fixed

clip: rect(top, right, bottom, left)
clip通常使用在以下两种情景：
1. 对于普通元素或者absolute定位的元素，利用overflow的元素可以裁剪；
但对于fixed的 overflow无效，因为fixed固定定位元素的包含块是根元素。

最佳可访问性隐藏
给需要隐藏但有希望给搜索的元素添加该属性即可
 利于seo

```css
.clip {
 position: absolute;
 clip: rect(0 0 0 0);
} 
```
添加该属性就可以实现隐藏性的访问。 
clip与其他隐藏属性的对比:
1. display: none / visibiliy: hidden的方式下，其中按钮无法被focus，
    其次是IE8下提交行为会丢失
2. 透明度为0去覆盖也是可以的，移动端项目建议这样，但pc端不建议，因为可能需要各自计算具体覆盖的位置。

3. 还有一种隐藏式访问
```css
.abs-out{
position: absolute;
left: -999px;
top: -999px}
```
这样看了，pc适合clip，移动适合transparent为0来覆盖。

总结： clip隐藏就仅仅决定了哪部分可见，非可见的部分是无法响应点击事件的；
其次，虽然视觉上隐藏了，但元素的尺寸依然还是保留原本的样子

浮动与绝对定位有一定的冲突，尤其时无依赖的绝对定位和浮动遇上的话。会出现浏览器之前的小问题



absolute && text-align

本身text-align是不会影响absolute或者float后的元素的，因为设置absolute或者float后，元素会块状化 ,但内联元素前面存在一个空白幽灵节点，他会居中，导致图片就会偏后，所以得利用margin-left负一半图片宽回去。

以下是全兼容版本。

```html
<p class='compa'>
    <img src='1.png'>
</p>
```

```css
p {
    width: 300px; height: 120px;
    background-color: #eef0f6;
    text-align: center;
}
img {
    position: absolute;
}

/* IE兼容处理 */
.compa {
    font-size: .1px;
    font-size: -webkit-calc(1px - 1px);
}
.compa:before {
    content: "\2002";
}
```
只有当absolute遇上left/top/right bottom才变成了真正的绝对定位元素。
此时absolute的元素丢失原本相对特性，会相对于定位元素进行left top方位的对齐。

绝对定位居中
```css
  .element{
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px; /* 这里是宽高的一半 */
    margin-top: -100px;
  }
```
第二种，但这个方法可能导致ios微信闪退
```css
  .element{
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) /* 即自身的尺寸一半 */
  }
```
首推呢，还是下面的
```css
  .element{
    width: 300px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
```

### 接着是relative对absolute的限制
relative有两大特性 
1. 相对自身原始的位置进行位移（具体的数值时）
2. 无侵入，意思是进行定位偏移的时候，是不会影响周围元素的。
当使用百分比进行偏移时，是相对于器包含块的。

如果父级的高度不是格式化的高度，那么relative的百分比高度等同于 0

1. 尽量不适应relative偏移定位，如果需要，可以考虑试试无依赖的绝对定位
2. 如果场景受限，必须使用relative，就尽量少影响剩余的布局。

### fixed定位
fixed的包含块是根元素，可以理解为<html> 


