<template>
  <div class="main-box" style="width: 100%;height: 100%;position: relative;">
    <div class="syBox">
      <div class="syItem ">
        <div class="suTop">今日溯源次数</div>
        <div class="syNum">16</div>
      </div>
      <div class="syItem ">
        <div class="suTop">本周溯源次数</div>
        <div class="syNum">16</div>
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
    onMounted,
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
    chartInstance.value = echarts.init(containerRef.value)
    let tdata = []
    for (let index = 1; index < 13; index++) {
      tdata.push({
        name: index + '月',
        max: 100
      })

    }
    // console.log(tdata);
    const initOption = {
      // color: ['#3D91F7', '#61BE67'],
      tooltip: {
        // show: false // 弹层数据去掉
      },
      legend: {
        show: false
      },
      radar: {
        center: ['35%', '50%'], // 外圆的位置
        radius: '65%',
        axisName: {
          name: {
            color: '#81B8CC',
            fontSize: 12,
            fontWeight: 400,
            // fontFamily: 'PingFangSC-Regular,PingFang SC',
            // fontStyle: 'normal',
          },
        },
        // TODO:
        indicator: tdata,
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ['#1c2330'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          }
        },
        axisLine: {
          // 指向外圈文本的分隔线样式
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: '#1781BA', // 分隔线颜色
            width: 1 // 分隔线线宽
          }
        }
      },
      series: [{
        type: 'radar',
        symbolSize: 5,
        symbol: "circle",
        data: [{
          // TODO:
          value: [80, 80, 80, 70, 60, 50, 21, 43, 14, 23, 13, 44],
          name: '溯源数量',

          areaStyle: {
            color: "#39B2FF",
            opacity: 0.3
          },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00A2FF'
            }, {
              offset: 1,
              color: '#0060FF'
            }], false),
            width: 1
          },
          color: "#81B8CC ",
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00DEFF'
          }, {
            offset: 1,
            color: '#1598FF'
          }], false),
          borderWidth: 0.5,
          opacity: 1
          // itemStyle: {

          // },
        }]
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

  .syBox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    // left: 10%;
    right: 10%;
    display: flex;
    flex-direction: column;
    // gap: 10px;
    gap: 2vh;
    // width: 200px;

    .syItem {
      // padding: 3px 20px;
      border-radius: 10px;
      font-size: 12px;
      // background-color: #fff;
      cursor: pointer;
      z-index: 99;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // width: 200px;
    }

    .syTop {
      text-align: center;
      margin-top: 2vh;
    }

    .syNum {
      color: #9DDDED;
      text-align: center;
      margin-top: 2vh;
      font-size: 23px;
    }
  }

  .main-content {

    width: 100%;
    height: 100%;
  }
</style>