
module.exports = {
    title: '超级爱吨吨',
    base: '/mydiary/',
    description: 'muamua',
    themeConfig: {
      lastUpdated: 'Last Updated',
      smoothScroll: true,
      siderbar:[
        {
          sidebarDepth: 2,
        }
      ],
      nav: [
        {text: 'HOME', link: '/css/css_chapter.html'},
        {text: 'github', link: 'https://xdmatirx.github.io/'}
      ]
    },
    plugins: [
      '@vuepress/back-to-top',
      'autobar',
      'fulltext-search',
    ]
}