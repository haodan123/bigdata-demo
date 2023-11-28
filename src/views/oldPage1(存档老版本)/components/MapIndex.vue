<template>
  <div class="main-box" style="width: 100%;height: 100%;position: relative;">
    <div class="main-content" style="width: 100%;height: 100%;" ref="containerRef"></div>

  </div>
</template>
<script setup>
  import {
    requestPost
  } from '@/api/index.js'
  // import {
  //   mapUrl
  // } from '@/config/global_config.js'
  import {
    onMounted,
  } from 'vue'
  import * as echarts from "echarts";
  import chinaJson from '@/json/china.json'
  // import axios from "axios";
  // import biaodian from '@/assets/bama/chuanganqi.png'
  import mapicon from '@/assets/liaoning/position.png';
  import hooks from '@/hooks';
  const {
    useChart
  } = hooks;
  const {
    chartInstance,
    containerRef
  } = useChart()

  onMounted(() => {
    initChart();
  })

  const initChart = async () => {
    console.log('ref', containerRef);
    chartInstance.value = echarts.init(containerRef.value);
    // 获取中国地图的矢量数据
    // const res = await axios.get(`${mapUrl}/static/map/json/china.json`);
    // echarts.registerMap("china", res.data);
    // 本地地图
    echarts.registerMap("china", chinaJson);
    const initOption = {
      legend: {
        orient: 'vertical',
        textStyle: {
          fontSize: 14,
          // color: '#fff'
          // color: 'skyblue',
          color: '#fff'
        },
        inactiveColor: '#545252', //未选中的颜色修改
        itemHeight: 30, //修改icon图形大小
        itemWidth: 30, //修改icon图形大小
        right: '3%',
        bottom: '5%',
        data: [{
          name: '种植园区',
        }],

      },
      geo: {
        type: "map",
        map: "china",
        roam: true,
        // center: [122.50,40.37],
        zoom: 1,
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        itemStyle: {
          areaColor: "#21479a",
          borderColor: "#59c0fa",
          borderWidth: 1,
          shadowColor: "#59c0fa",
          shadowBlur: 30,
        },
        emphasis: {
          label: {
            show: true,
            color: "#fff",
            fontSize: 10,
          },
          itemStyle: {
            areaColor: "#29adf7",
            borderColor: "#fff",
            borderWidth: 1,
          },
        },
      },
      tooltip: {
        shadowBlur: 0, // 设置阴影模糊程度为0
        shadowColor: 'transparent', // 设置阴影颜色为透明
        trigger: "item",
        borderColor: "transparent",
        backgroundColor: "transparent",
        borderWidth: 0.1,
        padding: 0,
        margin: 0,
        // position: 'inside',
        position: function (point) {
          // 自定义 Tooltip 弹窗的位置
          var top = point[1];
          var left = point[0];

          // 通过判断 top 和 left 值，调整弹窗的位置
          // 可以根据具体需求进行逻辑编写，确保弹窗不覆盖标点并且不超出地图外

          return [left, top];
        },
        textStyle: {
          textAlign: "center",
          color: "transparent",
          fontSize: "16",
        },
        formatter: function (params) {
          // console.log(params);
          // if (params.data.type == 'laji') {
          // "<style>.tcontent {width: 270px;height: 400px;line-height: 25px;font-size: 14px;background: url('https://gzzydv.gzsxdzy.com/static/qc/maptip2.png')  no-repeat ;color: white;}</style>" +
          const tipHtml =
            "<style>.tcontent{width:320px;height:250px;line-height:25px;font-size: 14px;background: url('https://gzzydv.gzsxdzy.com/static/qc/maptip.png') center center no-repeat;background-size: cover;color:white;}</style>" +
            "<div class='tcontent'>" +
            "<div style='margin-left:30px;padding-top:20px;'>" +
            `<br/>园区名称:${params.data.yname}` + "<br/>" +
            "种植面积:" + `${params.data.area}亩` +
            `<br/>园区位置:<span style='width:90px;white-space: normal;'>${params.data.address}</span>` +
            `<br/>负责人:${params.data.person}` +
            "<br/>地块数量:" + `${params.data.num}` +
            "<br/>人力投入:" + `${params.data.personCnt}` +
            "</div></div>";
          return tipHtml
          // } else {
          //   return ''
          // }

        },
      },
      series: [{
        name: '种植园区',
        type: 'scatter',
        coordinateSystem: 'geo',
        // data: [{
        //     name: '巴马镇',
        //     value: [122.55,40.26, 100],
        //     type: 'laji'
        //   },

        // ],
        symbol: 'image://' + mapicon,
        symbolSize: function () {
          // return val[2] / 4.5; //根据value 来决定图标大小
          return 30;
        },
        label: {
          normal: {
            show: false,
            formatter: function (params) {
              // console.log(params);
              return params.name;
            },
            position: 'right',
            color: '#fff',
            fontSize: '8'
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#4bbbb2',
            borderWidth: 2,
            borderColor: '#b4dccd'
          }
        }
      }, ]
    };
    chartInstance.value.setOption(initOption);
    chartInstance.value.on('click', (res) => {
      console.log(res);
      // this.$router.push(`/ydj2?id=${res.data.id}&address=${res.data.address}`)
    })
    readData();
  }
  const readData = async () => {
    const {
      data: res
    } = await requestPost(`mapdis2`, {})
    requestPost
    const resData = []
    res.data.forEach(item => {
      let obj = {}
      obj.value = [item.jid, item.wid]
      obj = {
        ...obj,
        ...item
      }
      if (obj.ytype == '1') {
        resData.push(obj)
      }
    })
    console.log('resdata', resData);
    // 对数据进行赋值
    updateChart(resData);
  }

  const updateChart = (resData) => {
    console.log('地图', resData);
    const dataOption = {
      series: [{
        data: resData
      }]
    };

    chartInstance.value.setOption(dataOption);
  }
</script>
<style lang="scss">
  .shebei-box {
    position: absolute;
    top: 4%;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(12, 23, 29, 0.5);
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .shebei-item {
      width: 150px;
      height: 60px;
      position: relative;

      .p1 {
        font-size: 16px;
      }

      .img-big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .img-small {
        display: block;
        position: absolute;
        width: 1.7rem;
        height: 1.7rem;
        left: -10px;
        bottom: 10px;
      }


      div {
        color: #fff;
        position: absolute;
        left: 25%;
        top: 25%;
      }


    }
  }

  .tcontent {
    width: 270px;
    height: 400px;
    line-height: 25px;
    font-size: 14px;
    background: url('http://snow.shidongvr.com/static/maptip2.png') no-repeat;
    // background-size: cover;
    color: white;
  }

  .map_tip {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-size: calc(100vw * 18 / 1920);
    color: aliceblue;
    display: flex;
    color: #51aa38;
    align-items: center;
  }

  .map_tip img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
</style>