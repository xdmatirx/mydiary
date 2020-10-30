# 文本处理能力

em是基于当前元素计算的。
rem则是基于根元素计算的。根元素是确定的，所以减少了不确定性。
但rem是css3的单位，需要ie9以上才可以，注意兼容性。

### font-size支持长度值，也支持百分比值，也就是1em，100%这种。同事，还支持一些关键词。
larger，smaller

另外有ch这个单位，表示0的宽度，比如身份证，手机号11ch这样的限制宽度。

### font-weight有
normal bold 最常用

lighter，bolder这两个是相对于父级进行的一个变化。

### font-weight也可以是数值
从100-900， 必须是整百。其中400等于normal，700等于bold

### font-style
normal
italic 当前字体的斜体字体
oblique 单纯让文字倾斜，如果italic没有，则会解析为oblilque

### font属性
缩写为
[ [font-style || font-variant || font-weight] ? font-size [/ line-height ] ? font-family ]
发现font-size和font-family不可省略。

font还支持关键词设置，比如
caption icon menu message small-caption status-bar

caption：活动窗口标题栏使用的字体。
•icon：包含图标内容所使用的字体，如所有文件夹名称、文件名称、磁盘名称，甚至浏览器窗口标题所使用的字体。
•menu：菜单使用的字体，如文件夹菜单。
•message-box：消息盒里面使用的字体。
•small-caption：调色板标题所使用的字体。
•status-bar：窗体状态栏使用的字体。

注意 使用了关键词就不要在写别的参数，否则会被当做字体

@font face


### text-indent
用于控制内联元素缩进的。

但现在因为图文并存，导致直接使用不太好，适合配合h1，h2这类标签实现seo

值可以是数值，也可是百分比。
百分比一般用于宽度已知的内联元素的居中对齐。

```css
.box{
  text-indent: 50%
}

.box img{
  width: 256px;
  margin-left: -128px;
}
```
但有着text-align: center，就没他什么事。

特殊知识点：
1. text-indent 仅对**第一行**的内联盒子内容有效
2. 非替换元素以外的display计算值为inline的内联元素设置text-indent无效；如果是对inline-block/inline-table
3. input标签按钮的text-indent值无效
4. button的text-indent有效。但有兼容性差异。
5. input textarea输入框里的text-indent在低版本ie上有问题。

### letter-spacing
用来控制字符之间的距离。(包括中文字符、英文字母、空格等)

1. 该属性具有继承性
2. 默认值为normal而不是0；通常情况normal和0无差异。
3. 支持负值，足够大时可以形成重叠字符；甚至反向排列的字符。

负值只能让字符重叠，不可以让替换元素或则inline-block/inline-table元素发生重叠。

### word-spacing
单词的间距（实际作用于空格，改版空格字符大小，包括了space，enter，tab以及&nbsp;）
 

特点
1. 继承性
2. 默认值为normal而不是0；通常情况normal和0无差异。
3. 支持负值，可让字符重叠，


word-break 以及 word-wrap
work-break: normal; 默认规则
work-break: break-all; 允许非cjk文本间单词断行
work-break: keep-all; 

word-wrap: break-word

white-space处理
normal: 合并空白字符和换行符
pre: 
nowrap:
pre-wrap:
pre-line:

```css
.justify {
  text-align: justify;
  text-justify: inter-ideograph;
}
```

text-transform: uppercase;
text-transform: lowercase;

指定输入的内容自动变为大、小写。
比如验证码，身份证这类。

:: 伪元素选择器

比如::first-letter,::after, ::backdrop

:伪类选择器
:active, :focus, :checked

:first-letter生效需要元素的display值为，block，inline-block，list-item,table-cell 或者 table-caption
同样，不是所有的值都是可以作为first-letter使用的，
常见的标点符号、括号、引号都是辅助类的字符，不算的。
·@#%&*()（）[]【】{}:："“”;；'‘’》《,，.。？?!！...*、/\ 
以上这些就是

正常情况下，可以直接作为伪元素的有数字，英文字母，汉字，$,一些运算符和空格

另外，字符前面不可有inline-block/inline-table之类元素

但是:first-line没有那么多无法使用的字符





















