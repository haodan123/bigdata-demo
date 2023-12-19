<template>
  <div class="main-box" style="width: 100%;height: 100%;position: relative;">
    <div class="yearBox">
      2023年
    </div>
    <div class="czBox">
      <div class="czItem ">
        <p>黄精/樱桃</p>
        <p>种植</p>
      </div>
      <div class="czItem ">
        <p>农产品</p>
        <p>加工制造</p>
      </div>
      <div class="czItem ">
        <p>商贸物流</p>
        <p>旅游餐饮</p>
      </div>
    </div>
    <div class="main-content" ref="containerRef" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script setup>

  import {
    requestGet
  } from '@/api/index.js'
  import {
    onMounted
  } from 'vue'
  import hooks from '@/hooks';
  const {
    useChart
  } = hooks;
  const {
    chartInstance,
    containerRef,
    echarts
  } = useChart()
  onMounted(() => {
    initChart();
  })

  const initChart = async () => {
    chartInstance.value =echarts.init(containerRef.value)
    const initOption = {
          tooltip: {
            show: true,
            trigger: "axis", //axis , item
          },
          grid: {
            right: "5%",
            top: "15%",
            left: "5%",
            bottom: "23%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: ["一产", "二产", '三产'],
            axisLabel: {
              // textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontSize: 12
              // }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "rgba(77, 128, 254, 0.2)"
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false,
              lineStyle: {
                color: "rgba(77, 128, 254, 0.2)"
              }
            }
          },
          yAxis: [{
            type: "value",
            name: '亿元',
            interval: 20,
            splitNumber: 3,
            axisLabel: {
              // textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontSize: 12
              // }
            },
            nameTextStyle: {
              color: "#fff",
              fontSize: 10,
              padding: [0, 10, 0, 0], // 上右下左与原位置距离
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(77, 128, 254, 0.2)"
              }
            }
          }],
          series: [{
            name: '园区生产值',
            type: "pictorialBar",
            barWidth: "60%",
            stack: "总量",
            label: {
              // normal: {
                show: false
              // }
            },
            itemStyle: {
              // normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0,
                      color: "#A57444" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#4150BB" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                } //渐变颜色
              // }
            },
            symbol: "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

            data: [98, 87, 84, 74, 23]
          }]
        }
    chartInstance.value.setOption(initOption)
    readData()
  }
  const readData = async () => {
    // const {
    //   data: res
    // } = await requestGet(`cl?jid=0`)
    // const resData = res.data
    // // // 对数据进行赋值
    // updateChart(resData)
  }
  const updateChart = (resData) => {
    const timeArr = resData.map(item => item.year)
    const chulan = resData.map(item => item.cl)
    const cunlan = resData.map(item => item.cl)
    // 处理数据
    // 类目轴的数据
    // const timeArr = this.allData.timeArr
    // // y轴的数据，series下的数据
    // const seriesArr = this.allData.dataArr
    // console.log('aaaaaa',timeArr,seriesArr)
    const dataOption = {
      xAxis: {
        data: timeArr
      },
      series: [{
        data: chulan
      }, {
        data: cunlan
      }]
    }
    chartInstance.value.setOption(dataOption)
  }
</script>

<style scoped lang="scss">
  .main-box {
    width: 100%;
    height: 100%;
    // color: rgb(166, 187, 92);
  }

  .yearBox {
    position: absolute;
    right: 3%;
    top: 2%;
    background: linear-gradient(to right, #5085A3, #3762A8);
    font-size: 12px;
    color: #fff;
    padding: 3px;
    // border-radius: 3px;
  }

  .czBox {
    position: absolute;
    // top: 5%;
    bottom: 3%;

    left: 15%;
    display: flex;
    gap: 10px;

    .czItem {
      padding: 3px 20px;
      border-radius: 10px;
      cursor: pointer;
      z-index: 99;
      color: #fff;
      font-size: 12px;
      text-align: center;
      // background-color: rgba(0, 49, 85, 1);
      background-color: #0C153B;
      border: 1px solid rgba(0, 151, 251, 1);
    }

  }

  .main-content {

    width: 100%;
    height: 100%;
  }
</style>