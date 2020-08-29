# 4种盒尺寸

尺寸影响的4大块：content padding border margin

首先是content。

content

替换元素：指的是通过修改某属性的值，就可以替换其呈现内容的元素。

```css
<img src> 比如src改为其他值
input
textarea
video
iframe
select
button
都是类似的。
```

除了上述的内容可替换外，还有以下的属性。

- 内容的外观是不受页面上css影响的。
- 有自己的默认尺寸，通常是300 150
- 在很多css属性上有自己的一套表示方式

单独领出来讲是：替换元素的尺寸计算规则不太一样。

由内到外分为3类，固有尺寸，html尺寸，css尺寸。

- 固有：指的就是替换内容原本的尺寸，比如图片 video，原本的固有尺寸

- html尺寸： html标签上面的尺寸

  比如img的width height，input的size，textarea的cols 和 rows 。

- css尺寸：指的是可以通过css的width height之类设定。

优先级为由内到外升高，

建议使用 下面的来实现首屏加载 异步显示

```css
<img >
<img src="./a.png">


img{visibility: hidden}
img[src] {visibility: visibile}
```

然后有一个重点 我们是无法改变这类元素的固有尺寸的。width和height生效是因为内容的填充方式是fill。

所以 下图的图片尺寸不会改变，仍旧以原始样子出现。可以通过设置成bg-img改变。

```css
div:before {
	content: url('1.jpg');
	width: 200px;
	height: 300px;
	display: block
}
```

css3的 object-fit可以对img他们的填充方式修改。

#

