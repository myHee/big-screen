window.onload=function(){
  (function(){ // 立即执行函数
    // 数据变化
    let dataAll = [
      { year: "2023", data: [200, 300, 300, 900, 1500, 1200, 600] },
      { year: "2024", data: [300, 400, 350, 800, 1800, 1400, 700] }
    ];
    let chartDom = document.getElementById('leftBarId');
    let myChart = echarts.init(chartDom);
    let option = {
      color: ['#2f89cf'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [ "旅游行业","教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业" ],
        axisLabel: { // 修改刻度标签 相关样式
          color: 'rgba(255,255,255,.6)',
          fontSize: 12
        },
        axisLine: { // 不显示X轴的样式
          show: false
          // 如果想要设置单独的线条样式 
          // lineStyle: {
          //    color: 'rgba(255,255,255,.1)',
          //    width: 1,
          //    type: 'solid'
         }
      },
      yAxis: {
        type: 'value',
        // y 轴文字标签样式
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: 12
        },
        // y轴线条样式
        axisLine: {
          show: true, // 从 v5.0.0 开始，数值轴 (type: 'value') 默认不显示轴线，需要显式配置。
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 1,
          }
        },
        // y 轴分隔线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      },
      series: [
        {
          data: dataAll[0].data,
          type: 'bar',
          barWidth: '35%', // 修改柱子宽度
          itemStyle: { // 修改柱子圆角
            barBorderRadius: 5
          }
        }
      ]
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })

    // 点击年份展示对应数据
    $('.bar h2').on('click', 'a', function(){
      let obj = dataAll[$(this).index()]
      option.series[0].data = obj.data
      // 重新渲染图表
      option && myChart.setOption(option)
    })
  })();

  (function(){
    let myChart = echarts.init(document.getElementById('rightBarId'));
    // 声明颜色数组
    let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    let option = {
      grid: { // 修改图形大小 grid
        top: "10%",
        left: "22%",
        bottom: "10%",
        // containLabel: false
      },
      xAxis: { // 不显示x轴 
        show: false
      },
      yAxis: [
        {
          data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
          inverse: true, // 是否是反向坐标轴
          axisLine: { //不显示y轴线条
            show: false
          },
          axisTick: { // 不显示刻度
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
        },
        {
          data:[702, 350, 610, 793, 664],
          inverse: true, // 是否是反向坐标轴
          axisLine: { //不显示y轴线条
            show: false
          },
          axisTick: { // 不显示刻度
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
        },
      ],
      series: [
        {
          name: "条",
          type: 'bar',
          data: [70, 34, 60, 78, 69],
          yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
          label: { // 图形上的文本标签
            normal: {
              show: true,
              position: "inside", // 图形内显示
              formatter: "{c}%" // 文字的显示格式 {c}数值名，自动解析为data里的数据
            }
          },
          barCategoryGap: 50, // 柱子之间的距离
          barWidth: 10, //柱子的宽度
          itemStyle: { // 柱子设为圆角
              normal: {
                barBorderRadius: 20,
                color: function(params) {
                  // var num = myColor.length;
                  // return myColor[params.dataIndex % num];
                  return myColor[params.dataIndex];
                }     
              }
          },
        },
        {
          name: "框",
          type: "bar",
          data: [100, 100, 100, 100, 100],
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
          barCategoryGap: 50,
          barWidth: 18,
          itemStyle: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          },
        }
      ],
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })
  })();

  (function(){
    let yearData = [
      {
        year: "2020", // 年份
        data: [
          // 两个数组是因为有两条线
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ]
      },
      {
        year: "2021", // 年份
        data: [
          // 两个数组是因为有两条线
          [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
          [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
        ]
      }
    ]
    let myChart = echarts.init(document.getElementById('leftLineId'));
    let option = {
      color: ['#00f2f1', '#ed3f35'],
      tooltip: { // 提示框组件。
        trigger: 'axis' // 触发类型。坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      },
      legend: { // 图例组件
        // series有name属性，legend可以不用写data
        textStyle: {
          color: '#4c9bfd' // 图例文字颜色
        },
        right: '10%' // 距离右边10%
      },
      grid: { // 设置网格样式
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        show: true,// 显示边框
        borderColor: '#012f4a',// 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      toolbox: { // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false // 去除轴内间距
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' // 分割线颜色
          }
        }
      },
      series: [{
        name:'新增粉丝',
        type: 'line',
        data:  yearData[0].data[0],
        smooth: true, // 折线修饰为圆滑
        },{
        name:'新增游客',
        type: 'line',
        data: yearData[0].data[1],
        smooth: true,
      }]
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })

    // 点击年份展示对应数据
    $('.line h2').on('click', 'a', function(){
      let obj = yearData[$(this).index()]
      obj.data.map((item, idx) => {
        option.series[idx].data = item
      })
      // 重新渲染图表
      option && myChart.setOption(option)
    })
  })();

  (function(){
    let myChart = echarts.init(document.getElementById('rightLineId'));
    let option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: "0%",
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12"
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "10",
        top: "30",
        right: "10",
        bottom: "10",
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
          // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.2)"
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12
            }
          },
          // 修改分割线的颜色
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        }
      ],
      series: [
        {
          name: '播放量',
          type: 'line',
          data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
          smooth: true,
          // 单独修改线的样式
          lineStyle: {
            color: "#0184d5",
            width: 2 
          },
          areaStyle: { // 填充区域
            // 渐变色，只需要复制即可
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          },
          // 设置拐点 小圆点
          symbol: "circle",
          // 拐点大小
          symbolSize: 12,
          // 设置拐点颜色以及边框
          itemStyle: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 10
          },
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
        },
        {
          name: '转发量',
          type: 'line',
          data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],
          smooth: true,
          lineStyle: {
            normal: {
              color: "#00d887",
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0, 216, 135, 0.4)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)"
            }
          },
          // 设置拐点 小圆点
          symbol: "circle",
          // 拐点大小
          symbolSize: 8,
          // 设置拐点颜色以及边框
          itemStyle: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          },
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
        }
      ]
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })
  })();

  (function(){
    let myChart = echarts.init(document.getElementById('leftPieId'));
    let option = {
      color: [ "#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        // 距离底部为0%
        bottom: "0%",
        // 小图标的宽度和高度
        itemWidth: 10,
        itemHeight: 10,
        data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
        // 修改图例组件的文字为 12px
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 12
        }
      },
      series: [
        {
          name: "年龄分布",
          type: "pie",
          // 设置饼形图在容器中的位置
          center: ["50%", "50%"],
          //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
          radius: ["40%", "60%"],
          // 不显示标签文字
          label: { show: false },
          // 不显示连接线
          labelLine: { show: false },
          data: [
            { value: 10, name: "0岁以下" },
            { value: 40, name: "20-29岁" },
            { value: 20, name: "30-39岁" },
            { value: 35, name: "40-49岁" },
            { value: 50, name: "50岁以上" }
          ],
        }
      ]
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })
  })();

  (function(){
    let myChart = echarts.init(document.getElementById('rightPieId'));
    let option = {
      color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
      legend: {
        top: "90%",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: 12
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '地区分布',
          type: 'pie',
          radius: ["10%", "70%"],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 0
          },
          data: [
            { value: 20, name: '云南' },
            { value: 26, name: '北京' },
            { value: 24, name: '山东' },
            { value: 25, name: '河北' },
            { value: 20, name: '江苏' },
            { value: 25, name: '浙江' },
            { value: 30, name: '四川' },
            { value: 42, name: '湖北' }
          ],
          // 文本标签控制饼形图文字的相关样式，注意它是一个对象
          label: {
            fontSize: 10,
            color: "rgba(255,255,255,.5)"
          },
          // 引导线调整
          labelLine: {
            // 连接扇形图线长
            length: 8,
            // 连接文字线长
            length2: 8
          } 
        }
      ]
    };
    option && myChart.setOption(option)
    // 让图表跟随屏幕自适应
    window.addEventListener('resize', function(){
      myChart.resize()
    })
  })();

  (function() {
    // 1. 实例化对象
    let myChart = echarts.init(document.getElementById("mapId"));
    // 2. 指定配置和数据 map.js中的geoCoordMap
    // 3. 添加航线 XAData XNData...
    let convertData = function(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
  
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          });
        }
      }
      return res;
    };
  
    let color = ["#fff", "#fff", "#fff"]; //航线的颜色
    let series = [];
    [
      ["西安", XAData],
      ["西宁", XNData],
      ["昆明", YNData],
      ["拉萨", LSData]
    ].forEach(function(item, i) {
      series.push(
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: "red", //arrow箭头的颜色
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 2,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + " Top3",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: color[i]
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        }
      );
    });
    let option = {
      tooltip: {
        trigger: "item",
        formatter: function(params, ticket, callback) {
          if (params.seriesType == "effectScatter") {
            return "线路：" + params.data.name + "" + params.data.value[2];
          } else if (params.seriesType == "lines") {
            return (
              params.data.fromName +
              ">" +
              params.data.toName +
              "<br />" +
              params.data.value
            );
          } else {
            return params.name;
          }
        }
      },
  
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: true,
            color: "#fff"
          }
        },
        roam: false,
        //   放大我们的地图
        zoom: 1.1,
        itemStyle: {
            areaColor: "rgba(43, 196, 243, 0.35)",
            borderColor: "rgba(43, 196, 243, 1)",
            borderWidth: 1,
          emphasis: {
            areaColor: "#2B91B7"
          }
        }
      },
      series: series
    };
    option && myChart.setOption(option)
    window.addEventListener("resize", function() {
      myChart.resize();
    });
  })();
}

