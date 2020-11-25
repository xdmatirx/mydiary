(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{393:function(t,s,a){"use strict";a.r(s);var n=a(97),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_4种盒尺寸"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4种盒尺寸"}},[t._v("#")]),t._v(" 4种盒尺寸")]),t._v(" "),a("p",[t._v("尺寸影响的4大块：content padding border margin")]),t._v(" "),a("p",[t._v("首先是content。")]),t._v(" "),a("p",[t._v("content")]),t._v(" "),a("p",[t._v("替换元素：指的是通过修改某属性的值，就可以替换其呈现内容的元素。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[t._v("<img src> 比如src改为其他值\ninput\ntextarea\nvideo\niframe\nselect\nbutton\n都是类似的。\n")])])]),a("p",[t._v("除了上述的内容可替换外，还有以下的属性。")]),t._v(" "),a("ul",[a("li",[t._v("内容的外观是不受页面上css影响的。")]),t._v(" "),a("li",[t._v("有自己的默认尺寸，通常是300 150")]),t._v(" "),a("li",[t._v("在很多css属性上有自己的一套表示方式")])]),t._v(" "),a("p",[t._v("单独领出来讲是：替换元素的尺寸计算规则不太一样。")]),t._v(" "),a("p",[t._v("由内到外分为3类，固有尺寸，html尺寸，css尺寸。")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("固有：指的就是替换内容原本的尺寸，比如图片 video，原本的固有尺寸")])]),t._v(" "),a("li",[a("p",[t._v("html尺寸： html标签上面的尺寸")]),t._v(" "),a("p",[t._v("比如img的width height，input的size，textarea的cols 和 rows 。")])]),t._v(" "),a("li",[a("p",[t._v("css尺寸：指的是可以通过css的width height之类设定。")])])]),t._v(" "),a("p",[t._v("优先级为由内到外升高，")]),t._v(" "),a("p",[t._v("建议使用 下面的来实现首屏加载 异步显示")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<img >\n<img src="./a.png">\n\n\nimg')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("visibility")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hidden"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("img[src]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("visibility")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" visibile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("然后有一个重点 我们是无法改变这类元素的固有尺寸的。width和height生效是因为内容的填充方式是fill。")]),t._v(" "),a("p",[t._v("所以 下图的图片尺寸不会改变，仍旧以原始样子出现。可以通过设置成bg-img改变。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("div:before")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("'1.jpg'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 200px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" block\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("css3的 object-fit可以对img他们的填充方式修改。")]),t._v(" "),a("h1",{attrs:{id:""}},[a("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])])])}),[],!1,null,null,null);s.default=e.exports}}]);