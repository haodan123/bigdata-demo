<template>
  <div class="main-box " style="width: 100%;height: 100%;position: relative;">
    <div class="yearBox">
      2023年
    </div>
    <div class="main-content" ref="chartRef" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script setup>
import {debounce} from '@/utils/index.js'
import {markRaw, onMounted, onUnmounted, ref} from 'vue'
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
    chartInstance.value = markRaw(echarts.init(chartRef.value))
    const dataSource = [{
        value: '8',
        unit: '个',
        name: '线下专卖店',
      },
      {
        value: '1',
        unit: '个',
        name: '线上专营店',
      },
      {
        value: '2',
        unit: '个',
        name: '线下销售平台',
      },
      {
        value: '3',
        unit: '个',
        name: '电商平台',
      },
      {
        value: '3',
        unit: '个',
        name: '社交电商平台',
      },

    ];



    const obliqueRectangle = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        offset: 10,
      },
      buildPath: (ctx, shape) => {
        ctx.moveTo(shape.x + shape.offset, shape.y);
        ctx.lineTo(shape.x + shape.width + shape.offset, shape.y);
        ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
        ctx.lineTo(shape.x, shape.y + shape.height);
        ctx.closePath();
      },
    });

    const colorArr = [
      ['#272941', '#D06D4B'],
      ['#183356', '#5DBEDB'],
      ['#2E3842', '#D7C45C'],
      ['#243E49', '#7CBB57'],
      ['#323A4B', '#CC925A']
    ]
    const bgColorArr = [
      '#2F2B40',
      '#1D3B58',
      '#2D3842',
      '#213A42',
      '#2A3041',
    ]
    echarts.graphic.registerShape('obliqueRectangle', obliqueRectangle);

    const initOption = {
      // backgroundColor: '#000',
      grid: [{
        left: '5%',
        top: '10%',
        right: '3%',
        bottom: '5%',
        containLabel: true,
      }, ],
      xAxis: [{
          gridIndex: 0,
          type: 'value',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
        {
          gridIndex: 0,
          type: 'value',
          max: 100,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          // console.log(params);
          return `
              <div style="font-size:12px;color:#808080;margin-bottom:8px;display:flex;align-items:center;line-height:1;padding:10px">
                    ${params[1].marker}
                      ${params[0].axisValue} :
                    <span style="flex:1;text-align:right;">${params[1].data}</span>
                  </div>
              `
        }
      },
      // data: dataSource.map((item) => item.name),
      yAxis: {
        type: 'category',
        inverse: true,
        namGap: 50,
        axisTick: {
          show: false,
        },
        axisLabel: {
          // margin: 20,
          // color: '#d1e6eb',
          color: '#fff'
        },
        data: dataSource.map((item) => item.name),
        // data: ['秋木耳', '羊肚菌', '山野菜', '秋木耳', '羊肚菌']
      },
      series: [{
          type: 'custom',
          xAxisIndex: 1,
          yAxisIndex: 0,
          data: dataSource.map(() => 100),
          renderItem: (params, api) => {
            const barLayout = api.barLayout({
              count: 1,
              barWidth: 8,
            });
            const {
              bandWidth,
              offsetCenter,
              width
            } = barLayout[0];
            const x = params.coordSys.x;
            const y = bandWidth * (params.dataIndex + 1 / 2) + offsetCenter + params.coordSys.y - width / 2;
            return {
              type: 'obliqueRectangle',
              shape: {
                x: x,
                // y: y + 2,
                y: y,
                width: api.size([api.value()])[0],
                height: width,
                offset: width * 0.5,
              },
              style: api.style(),
            };
          },
          itemStyle: {
            // borderRadius: [0, 8, 8, 0],
            // borderRadius: [0, 8, 8, 0],
            color: function (params) {
              // console.log(bgColorArr[params.dataIndex]);
              return {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  // color: `#3959ff`
                  color: bgColorArr[params.dataIndex]
                }, {
                  offset: 1,
                  // color: '#2ec8cf'
                  color: bgColorArr[params.dataIndex]
                }],
              }
            }
          },
          silent: true,
        },
        {
          type: 'custom',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: dataSource.map((item) => item.value),
          silent: true,
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: function (params) {
              // console.log(colorArr[params.dataIndex][0]);
              return {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  // color: `#3959ff`
                  color: colorArr[params.dataIndex][0]
                }, {
                  offset: 1,
                  // color: '#2ec8cf'
                  color: colorArr[params.dataIndex][1]
                }],
                //globalCoord: false
              }
            }
          },

          renderItem: (params, api) => {
            const barLayout = api.barLayout({
              barWidth: 8,
              count: 1,
            });
            const {
              bandWidth,
              offsetCenter,
              width
            } = barLayout[0];
            const x = params.coordSys.x;
            const y = bandWidth * (params.dataIndex + 1 / 2) + offsetCenter + params.coordSys.y - width / 2;
            return {
              type: 'obliqueRectangle',
              shape: {
                x: x,
                y: y,
                width: api.size([api.value()])[0],
                height: width,
                offset: width * 0.5,
              },
              style: api.style(),
            };
          },
        },
      ],
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

  const screenAdapter = debounce(() => {
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
    chartInstance.value.resize();
  })
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
</style>