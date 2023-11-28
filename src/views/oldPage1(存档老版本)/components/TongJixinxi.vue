<template>
  <div class="main-box" style="width: 100%;height: 100%;">
    <div class="main-content" ref="chartRef" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script setup>
  import {debounce} from '@/utils/index.js'

  import {
    requestGet
  } from '@/api/index.js'
  import {
    ref,
    onMounted,
    onUnmounted
  } from 'vue'
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
    chartInstance.value = echarts.init(chartRef.value)
    const initOption = {
      // backgroundColor: "#05224d",
      grid: {
        top: '15%',
        left: '1%',
        right: '7%',
        bottom: '0%',
        containLabel: true,
      },
      legend: {
        top: '0%',
        // left: '55%',
        right: '10%',
        itemGap: 50,
        data: ['产量', '产值'],
        textStyle: {
          color: '#f9f9f9',
          borderColor: '#fff'
        },
      },
      xAxis: [{
        name: '年',
        nameGap: 5,
        type: 'category',
        // boundaryGap: true,

        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#999'
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          color: '#999',
          // margin: 15,
          // textStyle: {
          // },
        },
        axisTick: {
          show: false,
        },
        // data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', ],
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 7,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0a3256'
          }
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          // margin: 20,
          color: '#999',
        },
        axisTick: {
          show: false,
        },
      }],
      tooltip: {
        trigger: 'axis',
      },
      series: [{
        name: '产量',
        type: 'line',
        // smooth: true, //是否平滑曲线显示
        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbol: 'emptyCircle',
        // symbolSize: 6,
        lineStyle: {

          color: "#28ffb3", // 线条颜色
          borderColor: '#f0f'
        },
        label: {
          show: false,
          position: 'top',
          color: '#fff',
        },
        itemStyle: {
          color: "#28ffb3",
          lineStyle: {
            width: 1,
            type: 'solid' //'dotted'虚线 'solid'实线
          }
        },
        areaStyle: { //区域填充样式
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0,154,120,1)'
            },
            {
              offset: 1,
              color: 'rgba(0,0,0, 0)'
            }
          ], false),
          shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
          shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        },
        // data: [393, 438, 485, 631, 689, 824, 987]
      }, {

        name: '产值',
        type: 'bar',
        barWidth: 15,
        // tooltip: {
        //   show: false
        // },
        label: {
          show: false,
          position: 'top',
          color: '#fff',
          // textStyle: {
          // }
        },
        itemStyle: {
          color: "#1cfffb",
          lineStyle: {
            width: 1,
            type: 'solid' //'dotted'虚线 'solid'实线
          },
          //  barBorderRadius: [30, 30, 0, 0],
        },
      }]
    };
    chartInstance.value.setOption(initOption)
    readData()
  }
  const readData = async () => {
    const {
      data: res
    } = await requestGet(`cl?jid=0`)
    const resData = res
    // // 对数据进行赋值
    updateChart(resData)
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

  const screenAdapter =debounce( () => {
    const titleFontSize = (chartRef.value.offsetWidth / 100) * 3.6;
    // this.titleFontSize = titleFontSize;
    const adapterOption = {
      title: {
        fontSize: titleFontSize,
      },
      // 图例的大小
      legend: {
        itemWidth: titleFontSize / 2,
        itemHeight: titleFontSize / 2,
        itemGap: titleFontSize / 2,
        fontSize: titleFontSize / 2,
        color: "#FFFFFF",
      },
    };
    chartInstance.value.setOption(adapterOption);
    // chartInstance.value.resize();
    chartInstance.value.resize();
  })
</script>

<style scoped lang="scss">
  .main-box {
    width: 100%;
    height: 100%;
  }

  .main-content {

    width: 100%;
    height: 100%;
  }
</style>