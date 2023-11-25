<template>
  <div class="chart-container">
    <div class="chart" ref="chartRef"></div>
    <!-- 底座背景 -->
    <div class="bg"></div>
  </div>
</template>
<script setup>
  import {
    getPie3D,
    getParametricEquation
  } from '@/utils/chart.js'

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

  const optionData = ref([{
      name: '公路运输',
      value: 176
    },
    {
      name: '航空运输',
      value: 288
    },
    {
      name: '铁路运输',
      value: 100
    }
  ])
  // const option = 
  let option = {}
  onMounted(() => {
    setLabel()
    initChart();
    // window.addEventListener("resize", screenAdapter);

  })
  onUnmounted(() => {
    chartInstance.value.dispose()
    // window.removeEventListener("resize", screenAdapter);
  })

  const setLabel = () => {
    const color = ['#005aff', '#f8b551', '#777F90', '#D06D4B', '#5DBEDB', '#D7C45C', '#7CBB57', '#CC925A']

    optionData.value.forEach((item, index) => {
      item.itemStyle = {
        color: color[index]
      }
      item.label = {
        normal: {
          show: true,
          color: color[index],
          // formatter: [
          //   '{b|{b}}',
          //   '{c|{c}}{b|台}',
          //   '{d|{d}%}'
          // ].join('\n'), // 用\n来换行
          formatter: [
            '{b|{b}}',
            '{d|{d}%}'
          ].join('\n'), // 用\n来换行
          rich: {
            b: {
              // color: '#fff',
              color: '#2A60C0',
              lineHeight: 20,
              align: 'left'
            },
            c: {
              fontSize: 22,
              color: '#fff',
              textShadowColor: '#1c90a6',
              textShadowOffsetX: 0,
              textShadowOffsetY: 2,
              textShadowBlur: 5
            },
            d: {
              // color: color[index],
              color: '#fff',
              align: 'left'
            }
          }
        }
      }
      item.labelLine = {
        normal: {
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.7)'
          }
        }
      }
    })
  }

  // 图表初始化
  const initChart = () => {
    chartInstance.value = echarts.init(chartRef.value)
    // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
    // this.option = getPie3D(this.optionData, 0.8, 240, 28, 26, 0.5)
    option = getPie3D(optionData.value, 0.8, 240, 28, 40, 0.5)
    chartInstance.value.setOption(option)
    // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    option.series.push({
      name: '运输占比', //自己根据场景修改
      backgroundColor: 'transparent',
      type: 'pie',
      label: {
        opacity: 1,
        fontSize: 13,
        lineHeight: 20
      },
      startAngle: -40, // 起始角度，支持范围[0, 360]。
      clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['30%', '50%'],
      center: ['50%', '45%'],
      data: this.optionData,
      itemStyle: {
        opacity: 0 //这里必须是0，不然2d的图会覆盖在表面
      }
    })
    chartInstance.value.setOption(option)
    bindListen(chartInstance.value)
  }

  // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
  // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
  const bindListen = (myChart) => {
    let selectedIndex = ''
    let hoveredIndex = ''
    // 监听点击事件，实现选中效果（单选）
    myChart.on('click', (params) => {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      const isSelected = !option.series[params.seriesIndex].pieStatus
        .selected
      const isHovered =
        option.series[params.seriesIndex].pieStatus.hovered
      const k = option.series[params.seriesIndex].pieStatus.k
      const startRatio =
        option.series[params.seriesIndex].pieData.startRatio
      const endRatio =
        option.series[params.seriesIndex].pieData.endRatio
      // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
        option.series[
          selectedIndex
        ].parametricEquation = getParametricEquation(
          option.series[selectedIndex].pieData.startRatio,
          option.series[selectedIndex].pieData.endRatio,
          false,
          false,
          k,
          option.series[selectedIndex].pieData.value
        )
        option.series[selectedIndex].pieStatus.selected = false
      }
      // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      option.series[
        params.seriesIndex
      ].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        option.series[params.seriesIndex].pieData.value
      )
      option.series[params.seriesIndex].pieStatus.selected = isSelected
      // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      selectedIndex = isSelected ? params.seriesIndex : null
      // 使用更新后的 option，渲染图表
      myChart.setOption(option)
    })
    // 监听 mouseover，近似实现高亮（放大）效果
    myChart.on('mouseover', (params) => {
      // 准备重新渲染扇形所需的参数
      let isSelected
      let isHovered
      let startRatio
      let endRatio
      let k
      // 如果触发 mouseover 的扇形当前已高亮，则不做操作
      if (hoveredIndex === params.seriesIndex) {
        // 否则进行高亮及必要的取消高亮操作
      } else {
        // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
          isSelected = option.series[hoveredIndex].pieStatus.selected
          isHovered = false
          startRatio = option.series[hoveredIndex].pieData.startRatio
          endRatio = option.series[hoveredIndex].pieData.endRatio
          k = option.series[hoveredIndex].pieStatus.k
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          option.series[
            hoveredIndex
          ].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[hoveredIndex].pieData.value
          )
          option.series[hoveredIndex].pieStatus.hovered = isHovered
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = ''
        }
        // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
        if (
          params.seriesName !== 'mouseoutSeries' &&
          params.seriesName !== 'pie2d'
        ) {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected =
            option.series[params.seriesIndex].pieStatus.selected
          isHovered = true
          startRatio =
            option.series[params.seriesIndex].pieData.startRatio
          endRatio = option.series[params.seriesIndex].pieData.endRatio
          k = option.series[params.seriesIndex].pieStatus.k
          // 对当前点击的扇形，执行高亮操作（对 option 更新）
          option.series[
            params.seriesIndex
          ].parametricEquation = getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.series[params.seriesIndex].pieData.value + 60
          )
          option.series[
            params.seriesIndex
          ].pieStatus.hovered = isHovered
          // 记录上次高亮的扇形对应的系列号 seriesIndex
          hoveredIndex = params.seriesIndex
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option)
      }
    })
    // 修正取消高亮失败的 bug
    myChart.on('globalout', () => {
      // 准备重新渲染扇形所需的参数
      let isSelected
      let isHovered
      let startRatio
      let endRatio
      let k
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[hoveredIndex].pieStatus.selected
        isHovered = false
        k = option.series[hoveredIndex].pieStatus.k
        startRatio = option.series[hoveredIndex].pieData.startRatio
        endRatio = option.series[hoveredIndex].pieData.endRatio
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[
          hoveredIndex
        ].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[hoveredIndex].pieData.value
        )
        option.series[hoveredIndex].pieStatus.hovered = isHovered
        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = ''
      }
      // 使用更新后的 option，渲染图表
      myChart.setOption(option)
    })
  }
</script>


<style lang='scss' scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 100%;

    .chart,
    .bg {
      width: 100%;
      height: 100%;
    }

    .bg {
      position: absolute;
      bottom: 50px;
      left: 50%;
      z-index: -1;
      width: 180px;
      height: 73px;
      background: no-repeat center;
      background-image: url('https://ks3-cn-beijing.ksyun.com/sxjg-elevator/datav-platform-2.0/images/chart_opacity_bg.png');
      background-size: 100% 100%;
      // opacity: 0.3;
      transform: translateX(-50%);
    }
  }
</style>