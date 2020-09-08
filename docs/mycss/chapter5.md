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
这里body的line-height都是21px，但子元素就不一样了
但body里面的子元素影响就不一样了

```css
line-height: 150%;
line-height: 1.5em;
```
这两者的子元素的line-height 是会继承父元素的line-height的。
也就是父元素的21px;
但line-height: 1.5的子元素不会继承，他们的line-height是会乘以当前子元素的font-size的。
所以比较好。

一般布局中，重视图文展示的，比如博客，论坛、公众号这列，最好使用数值，且考虑文章阅读舒适性，
值一般再1.6~1.8之间。

如果是重视布局结构的，使用长度值或者数值都可。
但基本大多网址都是很用数值作为全局line-height。

如果是长度值，建议为line-height:20px(1080p)
如果是数值，建议方便计算，比如1.5

### line-height有一个大值的属性

父子元素都包含line-height时，由两者的大值觉得最终的line-height

## vertical-align

可分为五类:

- 线类 baseline, top, middle, bottom
- 文本类 text-top，text-bottom
- 上标、下标类，sub,super，
- 数值类 如20px, 2em, 
- 百分比 20%

默认值为baseline
对于文字而言，就是字母x的下沿作为基线，故内联元素都是沿着字母x的下沿对齐。
但对于图片这种替换元素，通常使用元素本身的下边缘作为基线。
所以图文并排的时候，文字底端是和图片底端贴着的。
但中文通常还是会比x下沿要低些。

 


 

