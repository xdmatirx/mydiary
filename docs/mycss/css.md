# css_chapter3

## 首先 块级元素 与 ~~~display:block~~~ 不是一个概念

共同特征是独占一行，多个并存就会换行。

block级  inline级  inline-block内联；

### 块级盒子的width都是默认auto于父级的。

元素的width和height是作用域内部盒子上的。

**关于换行**：中文是会自动每个字就换行的，英单词和数字必须在一个整 体空格之后才换行，
例如一个单词（word, not a letter），
一整串的数字（3.1415926）这两种都是连着不可中间断开的，
如果后续的宽度不够，单词和数则整个都会到下一行，不会断开。



#### 元素**外部**的尺寸与表现形式关系有**<u>两种</u>**：

- 块级元素就像我们倒一杯水到容器里一样，会自动横向填充满，这就是正常的流该有的宽度，铺满父容器。

- 其次是“格式化宽度”，这仅出现在绝对定位模型下，即position:absolute/fixed情况。等第6章



#### 元素**内部**尺寸与实际表现关系：

所谓内部尺寸，就是说元素宽度由里面的元素决定的，而非外面的容器宽度

- 包裹性，就是内部元素再怎么变化，都不会超出外部这个容器，会进行换行一类的变化。
  - 一个特殊的作用就是，当元素内容多的时候，left对齐，少的时候center对齐。（inline-block、浮动元素 绝对定位元素都具有包裹性）
  
- 首选元素最小宽度。就是内部元素在内框的width为0时，会有一个最小宽度罩着，中文的化就是一个汉字宽，英文是单词加个`-`，图片的化自然就是图片本身宽度了。
  
- 最大宽度：指的是元素可以拥有的最大宽度。理解为前面的包裹性前提下，加上一个`whitespace: nowrap`后呈现的宽度。如果在内部盒子里，没有块级元素，那么最大宽度就是连续内联盒子组合起来的宽度。  

### 盒模型有这几种：

content-box  padding-box  border-box   margin没有
并且margin的背景永远是透明的。

然后我们同常写的width height是content-box的长宽。老ie5 ie6可能是border-box。
写width height时不要与border padding一起，因为borderpadding最终还是会影响最终呈现宽高，导致和我们预期不一。这里要进行一个宽度尺寸分离的原则。

```css
  .father {
    width: 180px
  }
  .son {
    padding: 5px
  }
```
这就保证了内部的这个元素的外边框宽一定是180px
内部可能由于padding变化在缩一缩之类的。总体最后还是180

```css
father {
  width: 100px;
  border: 1px
}
```
这实际的宽时102px。
width paddingn border 混用的时候，建议多一层标签，保证影响宽度的几个尺寸分开写，
margin无所谓，因为本身就是外部的尺寸。

但有一个东西叫 box-sizing的属性，可以改版width height作用的范围。
w3c的标准盒模型是content-box
这里插播一句，ie5.x ie6的盒模型默认是border-box

box-sizing是用来解决可替换元素宽度自适应的问题的。如 input textarea元素的宽度设定.

# 接下来是height

height相对简单，有一个点就是，height的100%是作用于父元素的，，但如果父元素是auto，或者也100%，那没有意义，还得向上层接着找，知道一个具体的数值。

如果想要height:100%生效，需要：
1. 显式使用一个高度值给父元素
   ```css
    father {
      height: 900px
    }
   ```
    这样就可以了。

2. 使用绝对定位。
  ```css
    son {
      position: absolute;
      height: 100%
    }
  ```
    这里有个需要注意的点：绝对定位的元素是相对于padding box计算的，非绝对定位相对于content-box计算height。

以上是width height的一些特点，
# 接下来是 min-width/max-width
使用场景一般是自适应的布局 或者流体布局。

min-height和min-width的初始值是auto不是0.
```css
.box{
  min-height: 0px
  transition: min-height: 0.3s
}
.box:hover {
  transition: min-height: 300px
}
```
建议这类有宽度高度变化处，**设一个transition**防止过快变化。

如果height和width不好整，可以借助max-height和max-width配合transition

```css
.ele{
    max-width: 100px;
    overflow: hidden;
    transition: max-width 0.5s;
}
.ele:hover {
    max-width: 200px;
}
```
## content部分
### 结合辅助元素去生成

<<<<<<< HEAD
假如我有一个h1是标题栏的文字，到了移动端，我希望用图片替代，
可以使用
```css
h1{
  content: url('./*.svg')
  // 好处是利于seo，这种替换而来的东西无法被选中下载，且搜索引擎还是按照原来的文字来取到的。用svg是因为更细腻
}
```

用content生成的任何东西都无法被选中，所以不要放需要给复制或者搜索引擎seo的内容。建议是无关紧要的东西。content做的其实只是视觉上的替换。

content属性大多和::before/::after相关。
例如
- 清除浮动
  ```css
    clear:after{
      content: '';
      display: table; 
      <!-- display: block 也可以 -->
      clear: both;
    }
  ```

  ### content辅助图片的生成使用
很少用content生成图片，一般用下面的方式，因为使用content尺寸难以控制，下面的话可以利用
```css
  div:before{
    content: '';
    background: url('./img');
  }

  .bgc:after{
    content: '';
    display: inline-block;
    width: 200px;
    height: 200px;
    background-image: url('./range.png');
}
```
### content的attr属性
content的attr属性挺好用的，
但里面的使用属性名称时不要带引号

```css
img{
  content: url(alt)
}
```
content先到这里

## padding
=======
## 内联元素：

定义：外在的表现形式为行内元素 inline-block inline-table inline都是。

表现出 的形式：那就是可以和文字 图片 一行显示。浮动元素这种不算。

通常是a， span，button，img，input，selection.


