# big-screen  大屏项目

echarts配置项手册：https://echarts.apache.org/zh/option.html#title
       示例：https://echarts.apache.org/examples/zh/index.html

图表可视化社区：https://www.makeapie.cn/echarts
模拟航线地图：https://www.makeapie.cn/echarts_content/x0-ExSkZDM.html

1.vscode中安装Easy LESS插件，使用less自动生成对应的css文件

2.案例适配方案
 设计稿是1920px 
 `
   function setRemUnit() {
    var rem = docEl.clientWidth / 24;
    docEl.style.fontSize = rem + "px";
  }
 `
  a. flexible.js 把屏幕分为 24 等份,1rem就是80px   1920/24 = 80
  b. cssrem 插件的基准值是  80px 插件-配置按钮---配置扩展设置--Root Font Size 里面 设置。 但是别忘记重启vscode软件保证生效

3.模拟航线地图：https://www.makeapie.cn/echarts_content/x0-ExSkZDM.html
  1. 需要下载china.js提供中国地图的js文件
  2. 新建一个新的js文件 map.js 引入 地图相关数据

