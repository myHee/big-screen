<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="">
      </div>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
        <span class="datetime">{{ currentTime }}</span>
      </div>
    </header>

    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('trend')" />
          </div>
        </div>

        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('seller')" />
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('map')" />
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('rank')" />
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('hot')" />
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock" />
          <div class="resize">
            <span :class="['iconfont', fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt']" @click="changeSize('stock')" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Trend from '@/components/Trend.vue'
import Seller from '@/components/Seller.vue'
import Map from '@/components/Map.vue'
import Rank from '@/components/Rank.vue'
import Hot from '@/components/Hot.vue'
import Stock from '@/components/Stock.vue'
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
import { getData } from '@/utils/number'
export default {
  components: {
    Trend,
    Seller,
    Map,
    Rank,
    Hot,
    Stock
  },
  data() {
    return {
      currentTime: '', // 当前时间  2049-01-01 00:00:00
      timer: null,
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  },
  computed: {
    headerSrc() {
      return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
    },
    themeSrc() {
      return '/static/img/' + getThemeValue(this.theme).themeSrc
    },
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    },
    ...mapState(['theme'])
  },
  created() {
    // 注册接收到数据的回调函数
    this.$socket.registerCallBack('fullScreen', this.recvData)
    this.$socket.registerCallBack('themeChange', this.recvThemeChange)
  },
  mounted() {
    this.getCurrentTime()
  },
  destroyed() {
    this.$socket.unRegisterCallBack('fullScreen')
    this.$socket.unRegisterCallBack('themeChange')
  },
  methods: {
    getCurrentTime() {
      clearTimeout(this.timer)// 清除定时器
      const dt = new Date()
      const yy = dt.getFullYear()
      const mm = getData(dt.getMonth() + 1)
      const dd = getData(dt.getDate())
      const HH = getData(dt.getHours())// 获取时
      const MM = getData(dt.getMinutes())// 获取分
      const SS = getData(dt.getSeconds())// 获取秒
      this.currentTime = yy + '-' + mm + '-' + dd + ' ' + HH + ':' + MM + ':' + SS
      this.timer = setTimeout(this.getCurrentTime, 1000) // 设定定时器，循环运行
    },
    changeSize(chartName) {
      // 1.改变fullScreenStatus的数据
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      // 2.需要调用每一个图表组件的screenAdapter的方法
      // this.$refs[chartName].screenAdapter()
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenAdapter()
      // })
      // 将数据发送给服务端
      const targetValue = !this.fullScreenStatus[chartName]
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName: chartName,
        value: targetValue
      })
    },
    // 接收到全屏数据之后的处理
    recvData(data) {
      // 取出是哪一个图表需要进行切换
      const chartName = data.chartName
      // 取出, 切换成什么状态
      const targetValue = data.value
      this.fullScreenStatus[chartName] = targetValue
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    },
    handleChangeTheme() {
      // 修改VueX中数据
      // this.$store.commit('changeTheme')
      this.$socket.send({
        action: 'themeChange',
        socketType: 'themeChange',
        chartName: '',
        value: ''
      })
    },
    recvThemeChange() {
      this.$store.commit('changeTheme')
    }
  }

}
</script>
<style lang="less" scoped>

</style>
