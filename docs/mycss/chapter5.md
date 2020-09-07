内联元素与流

首先是基线的定义： 
    字母 x 的下沿就是我们的基线。
    
x-height表示的是字母x的高度，然后x上沿的位置称之为midian 中线。

然后vertical-align:middle指的是二分之一的x-height高度。

有一个单位 ex 指的是1个x的高度，这时候有一个应用：

```css
  .icon-arrow{
    display: inline-block;
    width: 20px;
    height: 1ex;     
  }
```
![例子](./img/5-1.png)
可以看出右边的图标和文字居中，那就只要让图标和字一样高就行了。

div高度其实是由行高 line-height 决定的，而非文字。

对于非替换元素的纯内联元素，视高完全由line-height决定。
border padding完全无影响。

css中，行距等分在文字上下方。

一般认为，行距 = 行高 - em-box

也就是 行距 = line-height - font-size
然后再一分为二。

对于纯文本元素，line-height直接决定了该行的高度

但是如果该行还有替换元素，line-height只决定最小高度。
原因是替换元素高度并不受line-height影响，二是vertical-align的影响

### line-height的居中效果

如果需要让内联元素居中，设置line-height属性就行。此方法只适合单行文字。

多行文字用vertiacl-align配合。

//？line-height的值和字体大小一致即可

另外line-height也并不是完全居中，是近似，原因是上下并不等分，稍微下沉一些。

如果需要 多行文本 或者 替换元素的垂直居中效果，得借助vertical-align

给多行文字设置vertical-align，以出现一个空白幽灵节点,
然后父级再设置line-height使得多行文字或该替换元素垂直居中。

## line-height介绍

default为normal 还支持数值、百分比、长度值。

normal值其实是与字体类型相关的，不同字体font-family的line-height不同

line-height的1.5 150% 1.5em看起来类似,实际上略有区别。

```css
body {
 font-size: 14px;
 line-height: 1.5;
}
body {
 font-size: 14px;
 line-height: 150%;
}
body {
 font-size: 14px;
 line-height: 1.5em;
}
```
这里body的line-height都是21px，但子元素就不一样了/


