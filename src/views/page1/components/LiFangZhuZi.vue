<template>
  <div class="main-box" style="width: 100%;height: 100%;position: relative;">
    <div class="sgBox">
      <div class="sgItem hgbg">黄精</div>
      <div class="sgItem ytbg">樱桃</div>
    </div>
    <div class="main-content" ref="chartRef" style="width: 100%;height: 100%;"></div>
  </div>
</template>


<script setup>
  import {
    requestGet
  } from '@/api/index.js'
  import {
    ref,
    markRaw,
    onMounted,
    onUnmounted
  } from 'vue'
  import {debounce} from '@/utils/index.js'

  import * as echarts from "echarts";
  const chartRef = ref()
  const chartInstance = ref()
  onMounted(() => {
    initChart();
    window.addEventListener("resize", screenAdapter);

  })
  onUnmounted(() => {
    chartInstance.value.dispose()
    window.removeEventListener("resize", screenAdapter);
  })

  const initChart = async () => {
    chartInstance.value =markRaw(echarts.init(chartRef.value)) 
    let data = {
      xAxisData: ["2016", "2017", "2018", "2019", "2020"],
      seriesData: [
        [200, 85, 12, 275, 305],
        [123, 55, 20, 55, 305]
      ]
    };
    const initOption = {
      grid: {
        top: '33%',
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return params[0].name + '</br>' +
            params[1].marker + params[0].seriesName + '：' + params[0].value + '</br>' +
            params[4].marker + params[3].seriesName + '：' + params[3].value;
        }
      },
      legend: {
        selectedMode: false, //取消图例上的点击事件
        right: '13%',
        // top: '7%',
        top: '17%',
        textStyle: {
          fontSize: 10,
          color: '#fff'
        },
        itemHeight: 5,
        itemWidth: 12,
      },
      xAxis: {
        type: 'category',
        data: data.xAxisData,
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "#ffffff",
          fontSize: 10,
          interval: 'auto', // x轴间距
          // rotate:40
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(152, 212, 255, .5)',
          }
        },
      },
      yAxis: [{
          type: "value",
          name: "亩",
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            color: "#fff",
            fontSize: 10,
            padding: [0, 10, 0, 0], // 上右下左与原位置距离
          },
          axisLabel: {
            // margin: 20,
            textStyle: {
              // color: '#d1e6eb',
              color: '#fff',
              fontSize: 10,
            },
          },
        },
        {
          type: "value",
          name: "吨",
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            color: "#fff",
            fontSize: 12,
            padding: [0, 0, 0, 10], // 上右下左与原位置距离
          },
          axisLabel: {
            // margin: 20,
            textStyle: {
              // color: '#d1e6eb',
              color: '#fff',
              fontSize: 10,

            },
          },
        },
      ],
      series: [{
          yAxisIndex: 0,
          data: data.seriesData[0],
          type: "bar", // 柱图
          barMaxWidth: "auto",
          barWidth: 20,
          name: "种植面积",
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
              colorStops: [{
                offset: 0,
                color: "rgba(166, 187, 92,1)"
              }, {
                offset: 0.5,
                color: "rgba(166, 187, 92,0.5)"
              }, {
                offset: 1,
                color: "rgba(166, 187, 92,0.3)"
              }]
            }
          }
        },
        {
          color: '#FCF1AE',

          yAxisIndex: 0,
          data: [1, 1, 1, 1, 1],
          type: "pictorialBar", // 底部
          barMaxWidth: "20",
          symbolOffset: [-12, "50%"],
          symbolSize: [20, 7]
        }, {
          color: '#FCF1AE',
          yAxisIndex: 0,
          data: data.seriesData[0],
          type: "pictorialBar", // 顶部
          barMaxWidth: "20",
          symbolPosition: "end",
          symbolOffset: [-12, "-50%"],
          symbolSize: [20, 6],
          zlevel: 2
        }, {
          yAxisIndex: 1,
          data: data.seriesData[1],
          type: "bar", // 柱图
          barMaxWidth: "auto",
          barWidth: 20,
          name: "产量",
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
              colorStops: [{
                offset: 0,
                color: "rgba(147, 121, 163,1)"
              }, {
                offset: 0.5,
                color: "rgba(147, 121, 163,0.5)"
              }, {
                offset: 1,
                color: "rgba(147, 121, 163,0.3)"
              }]
            }
          }
        },
        {
          color: '#F1AADB',
          data: [1, 1, 1, 1, 1],
          type: "pictorialBar", // 底部
          barMaxWidth: "20",
          symbolOffset: [12, "50%"],
          symbolSize: [20, 7],
          yAxisIndex: 1,
        }, {
          color: '#F1AADB',
          yAxisIndex: 1,
          data: data.seriesData[1],
          type: "pictorialBar", // 顶部
          barMaxWidth: "20",
          symbolPosition: "end",
          symbolOffset: [12, "-50%"],
          symbolSize: [20, 6],
          zlevel: 2
        },

      ]
    };
    chartInstance.value.setOption(initOption)
    readData()
  }
  const readData = async () => {
    // const {
    //   data: res
    // } = await requestGet(`cl?jid=0`)
    // const resData = res.data
    // // // 对数据进行赋值
    let resData = ''
    updateChart(resData)
  }
  const updateChart = (resData) => {
    // const timeArr = resData.map(item => item.year)
    // const chulan = resData.map(item => item.cl)
    // const cunlan = resData.map(item => item.cl)

    // const dataOption = {
    //   xAxis: {
    //     data: timeArr
    //   },
    //   series: [{
    //     data: chulan
    //   }, {
    //     data: cunlan
    //   }]
    // }

    // chartInstance.value.setOption(dataOption)
  }

  const screenAdapter = debounce(() => {
    const titleFontSize = (chartRef.value.offsetWidth / 100) * 3.6;
    // this.titleFontSize = titleFontSize;
    const adapterOption = {
      title: {
        textStyle: {
          fontSize: titleFontSize,
        },
      },
      // 图例的大小
      legend: {
        itemWidth: titleFontSize / 2,
        itemHeight: titleFontSize / 2,
        itemGap: titleFontSize / 2,
        textStyle: {
          fontSize: titleFontSize / 2,
          color: "#FFFFFF",
        },
      },
    };
    chartInstance.value.setOption(adapterOption);
    chartInstance.value.resize();
  })
</script>

<style scoped lang="scss">
  .main-box {
    width: 100%;
    height: 100%;
    // color: rgb(166, 187, 92);
  }

  .sgBox {
    position: absolute;
    top: 5%;
    left: 10%;
    display: flex;
    gap: 10px;

    .sgItem {
      padding: 3px 20px;
      border-radius: 10px;
      font-size: 12px;
      background-color: #fff;
      cursor: pointer;
      z-index: 99;
      color: #fff;
    }

    .hgbg {
      background: linear-gradient(to right, #503F22, #CB913E)
    }

    .ytbg {
      background: linear-gradient(to right, #395860, #6BAEBF)
    }
  }

  .main-content {

    width: 100%;
    height: 100%;
  }
</style>