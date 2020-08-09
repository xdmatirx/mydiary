
module.exports = {
    title: 'Vuepress介绍',
    base: '/mydiary/',
    description: '帮助个人博客或技术文档',
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