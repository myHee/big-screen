### 注意点
1. npm install
2. npm run serve
3. npm run build
4. vue create project-name
5. 启动koa，获取数据：node app.js
   
6. 监听的数据在组件卸载时要及时注销
   
7. echarts主题的使用：
   1. 引入主题：public/index.html
   2. 注册实例时指定：this.chartInstance = this.$echarts.init(dom, this.theme)
8. 图表事件监听：鼠标移入移出；对于数据滚动的图表，鼠标移入时 暂停滚动
   ```
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }
        this.updateChart() // 在更改完currentIndex之后 , 需要更新界面
      }, 5000)
    }

    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },

    destroyed() {
      clearInterval(this.timerId)
    },
   ```

9.  在图表容器大小改变时自适应容器大小: this.chartInstance.resize()
    destroyed() { 卸载组件时移除该事件
      window.removeEventListener('resize', this.screenAdapter)
    },
  
10. 切换主题时，注意样式问题，如背景颜色、背景图片、字体颜色等
    
11. 商家销售统计图表中，数据滚动：区域缩放  dataZoom
      dataZoom: {
        show: false,
        startValue: this.startValue,
        endValue: this.endValue
      },
    
12. 数据通过koa获取：this.$http.get('stock')
    
13. 使用WebSocket在客户端和服务器之间保持持久的连接，从而可以实时地发送和接收数据
    `在 main.js 中连接服务器端`:
    import SocketService from '@/utils/socket_service'

    // 对服务端进行websocket的连接
    SocketService.Instance.connect()
    // 将 SocketService 实例对象挂载到 Vue 的原型对象上。其他的组件  this.$socket
    Vue.prototype.$socket = SocketService.Instance

    `created 中注册回调函数`
    created () {
      // 当socket来数据的时候, 会调用getData这个函数
      this.$socket.registerCallBack('trendData', this.getData)
    }
    `destroyed 中取消注册`
    destroyed () {
      this.$socket.unRegisterCallBack('trendData')
    }

    `mounted 中往 socket 发送数据, 目的是想让服务端传输销量趋势这个模块的数据`
    mounted () {
      this.initChart()
      // this.getData() 先将getData的调用注释起来
      this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend'
      })
      ......
    },


    .约定好和客户端之间数据交互的格式和含义.客户端和服务端之间的数据交互采用 JSON 格式
    客户端发送数据给服务端的字段如下:
    {
      "action": "getData",
      "socketType": "trendData",
      "chartName": "trend",
      "value": ""
    }
    或者
    {
      "action": "fullScreen",
      "socketType": "fullScreen",
      "chartName": "trend",
      "value": true
    }
    或者
    {
      "action": "themeChange",
      "socketType": "themeChange",
      "chartName": "",
      "value": "chalk"
    }

    action : 代表某项行为,可选值有
      getData 代表获取图表数据
      fullScreen 代表产生了全屏事件
      themeChange 代表产生了主题切换的事件
    socketType : 代表业务模块类型, 这个值代表前端注册数据回调函数的标识, 可选值有:
      trendData
      sellerData
      mapData
      rankData
      hotData
      stockData
      fullScreen
      themeChange
    chartName : 代表图表名称, 如果是主题切换事件, 可不传此值, 可选值有:
      trend
      seller
      map
      rank
      hot
      stock
    value : 代表 具体的数据值, 在获取图表数据时, 可不传此值, 可选值有
      如果是全屏事件, true 代表全屏, false 代表非全屏
      如果是主题切换事件, 可选值有 chalk 或者 vintage

    服务端发送给客户端的数据如下:
    {
      "action": "getData",
      "socketType": "trendData",
      "chartName": "trend",
      "value": "",
      "data": "从文件读取出来的json文件的内容"
    }
    或者
    {
      "action": "fullScreen",
      "socketType": "fullScreen",
      "chartName": "trend",
      "value": true
    }
    或者
    {
      "action": "themeChange",
      "socketType": "themeChange",
      "chartName": "",
      "value": "chalk"
    }
  注意, 除了 action 为 getData 时, 服务器会在客户端发过来数据的基础之上, 增加 data 字段,其他的情况, 服务器会原封不动的将从某一个客户端发过来的数据转发给每一个处于连接状态的客户端
    




### Koa框架
Koa框架简介
Koa是一个轻量级、高性能的Web开发框架，由Express原班人马打造，旨在成为更加强大、更易于使用、更灵活的Web服务器框架。它采用Node.js的async/await语法，使得异步编程更加直观和优雅。

Koa的特点
Koa的主要特点包括中间件架构、错误处理机制以及对HTTP请求和响应对象的简化操作。Koa不捆绑任何中间件，开发者可以根据项目需求自由选择中间件进行堆叠，这种灵活的设计使得Koa在微服务架构中非常受欢迎。

中间件架构
Koa的中间件架构允许开发者创建一系列处理函数来处理HTTP请求和响应。每个中间件可以执行特定的操作，如解析请求体、验证用户身份、记录日志等，然后将控制权传递给下一个中间件。

错误处理
Koa提供了一个改进的错误处理机制，允许开发者捕获在请求处理过程中发生的任何错误。这种机制使得错误处理更加集中和高效。

### WebSocket   https://blog.csdn.net/ganyingxie123456/article/details/134467112
一、什么是Websocket
WebSocket 是一种在单个 TCP 连接上进行 全双工 通信的协议，它可以让客户端和服务器之间进行实时的双向通信。

WebSocket 使用一个长连接，在客户端和服务器之间保持持久的连接，从而可以实时地发送和接收数据。

在 WebSocket 中，客户端和服务器之间可以互相发送消息，客户端可以使用 JavaScript 中的 WebSocket API 发送消息到服务器，也可以接收服务器发送的消息。

二、Websocket特点
简单来说，websocket 具有 双向通信，实时性强，支持二进制，控制开销 的特点。

1、协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

2、实时通信，服务器可以随时主动给客户端下发数据。

3、保持连接状态，Websocket需要先创建连接，所以是一种有状态的协议，之后通信时就可以省略部分状态信息。

4、控制开销，连接创建后，服务器和客户端之间交换数据时，用于协议控制的数据包头部相对较小。在不包含扩展的情况下，对于服务器到客户端的内容，此头部大小只有2至10字节（和数据包长度有关）；对于客户端到服务器的内容，头部还需要加上额外的4字节的掩码。

5、实现简单，建立在 TCP 协议之上，服务器端的实现比较容易，并且没有同源限制，客户端可以与任意服务器通信。

6、支持二进制传输，Websocket定义了二进制帧，可以发送文本，也可以发送二进制数据。

7、与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

8、支持扩展，用户可以扩展协议、实现部分自定义的子协议，如部分浏览器支持压缩等。

三、WebSocket与HTTP的区别
websocket和http都是基于TCP的应用层协议，使用的也是 80 端口（若运行在 TLS 之上时，默认使用 443 端口）。

其区别主要就在于连接的性质和通信方式。

WebSocket是一种双向通信的协议，通过一次握手即可建立持久性的连接，服务器和客户端可以随时发送和接收数据。

而HTTP协议是一种请求-响应模式的协议，每次通信都需要发送一条请求并等待服务器的响应。

WebSocket的实时性更好，延迟更低，并且在服务器和客户端之间提供双向的即时通信能力，适用于需要实时数据传输的场景。

四、常见应用场景
实时聊天：WebSocket能够提供双向、实时的通信机制，使得实时聊天应用能够快速、高效地发送和接收消息，实现即时通信。
实时协作、实时数据推送、在线客服...

五、websocket实例
为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息"Upgrade: WebSocket"表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

1）Websocket事件
onopen: 客户端和服务器建立连接后触发，被称为客户端和服务器之间的初始握手。如果接收到open, 说明已经连接成功，可以进行通信了。
onmessage： 接收到消息时触发。服务器发送给客户端的消息可包括纯文本消息，二进制数据（Blob消息或者ArrayBuffer消息）。
onerror： 响应意外故障时触发，在错误之后总是会终止连接。
onclose：连接关闭时触发。一旦连接关闭后，客户端和服务端将不会再进行消息的收发。也可主动调用close()方法关闭连接。

2）Websocket方法
send() : 在连接成功后关闭前，发送消息（onopen后和onclose前才可发送消息）
  参数：
  data: 要发送的数据，可以是字符串、二进制数据或者 Blob 对象。
close() : 关闭连接
  参数：
  code (可选): 一个数字，表示连接关闭的状态码。常见的状态码有 1000 表示正常关闭，1001 表示端点离开，等等。
  reason (可选): 一个字符串，表示连接关闭的原因。

3）Websocket对象属性
readyState：只读属性，表示Websocket的连接状态。
CONNECTING — 正在连接中，对应的值为 0；
OPEN — 已经连接并且可以通讯，对应的值为 1；
CLOSING — 连接正在关闭，对应的值为 2；
CLOSED — 连接已关闭或者没有连接成功，对应的值为 3。
bufferedAmount：未发送至服务器的字节数，只读属性。已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。
binaryType：使用二进制的数据类型连接，可以是 “blob” 或 “arraybuffer”。
extensions：服务器选择的通信扩展。
protocol：打开握手期间使用的协议（服务器选择的子协议）。
url: webSocket 的绝对路径。

六、websocket心跳机制
1、作用：使 WebSocket 连接保持长连接，避免断开连接的情况发生。同时，心跳机制也可以检查WebSocket连接的状态，及时处理异常情况。还可以减少WebSocket连接及服务器资源的消耗。

2、原理：是利用心跳包及时发送和接收数据，保证WebSocket长连接不被断开。

3、详细流程：

客户端建立WebSocket连接。

客户端向服务器发送心跳数据包（心跳包是指在一定时间间隔内，WebSocket发送的空数据包），服务器接收并返回一个表示接收到心跳数据包的响应。

当服务器没有及时接收到客户端发送的心跳数据包时，服务器会发送一个关闭连接的请求。

服务器定时向客户端发送心跳数据包，客户端接收并返回一个表示接收到心跳数据包的响应。

当客户端没有及时接收到服务器发送的心跳数据包时，客户端会重新连接WebSocket

4、实现方式

使用setInterval定时发送心跳包。对服务器造成很大的压力，因为即使WebSocket连接正常，也要定时发送心跳包，从而消耗服务器资源。

在前端监听到WebSocket的onclose()事件时，重新创建WebSocket连接。减轻了服务器的负担，但是在重连时可能会丢失一些数据。

5、WebSocket重连

重连意思就是在WebSocket断开之后重新建立连接，这里指由于异常断开需要重新连接。

常用实现方法有下：
1）前端监听WebSocket的onclose()事件，重新创建WebSocket连接。
2）使用WebSocket插件或库，例如Sockjs、Stompjs等。
3）使用心跳机制检测WebSocket连接状态，自动重连。
4）使用断线重连插件或库，例如ReconnectingWebSocket等。

6、通过WebSocket心跳机制，实现重连

思路： 在建立长连接的时候开启心跳 > 通过和服务端发送信息，得到服务端给返回的信息，然后重置心跳 > 清除时间，再重新开启心跳。（如果网络断开的话，会执行方法，重新连接）
