<script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    markRaw
  } from 'vue';
  import {
    debounce
  } from "@/utils";
  import * as echarts from "echarts";
  // interface Props {
  //     option: ECOption;
  //     width: string; // 必须指定容器的宽高，否则无法显示。（容器内图表会自动获取父元素宽高）
  //     height: string;
  //     theme?: Object | string;
  //     loading?: boolean; // 受控
  //     onMouseover?: (...args: any[]) => any;
  //     onMouseout?: (...args: any[]) => any;
  //     onClick?: (...args: any[]) => any;
  // }

  // const props = withDefaults(defineProps(), {
  //   theme: null,
  //   loading: false,
  // });

  const emit = defineEmits(['chartClick', 'chartMouseover', 'chartMouseout'])
  const props = defineProps({
    option: {
      type: Object,
      defined: () => {}
    },
    width: {
      type: String,
      defined: '100%'
    }, // 必须指定容器的宽高，否则无法显示。（容器内图表会自动获取父元素宽高）
    height: {
      type: String,
      defined: '100%'
    },
    theme: {
      type: [Object, String],
      defined: ''
    },
    loading: {
      type: Boolean,
      defined: false
    }, // 受控
    onMouseover: {
      type: Function,
      defined: () => {}
    },
    onMouseout: {
      type: Function,
      defined: () => {}
    },
    onClick: {
      type: Function,
      defined: () => {}
    }
  })

  const chartRef = ref(null);
  const chartInstance = ref();

  const draw = () => {
    if (chartInstance.value) {
      // console.log('修改了', props.option);
      chartInstance.value.setOption(props.option, {
        notMerge: true
      });
    }
  };

  const init = () => {
    if (!chartRef.value) return;

    // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
    chartInstance.value = echarts.getInstanceByDom(chartRef.value);
    if (!chartInstance.value) {
      chartInstance.value = markRaw(
        echarts.init(chartRef.value, props.theme, {
          renderer: 'canvas',
        })
      );

      // 绑定鼠标事件：
      if (props.onMouseover) {
        chartInstance.value.on('mouseover', (event) => {
          props.onMouseover(event, chartInstance.value, props.option);

        });
      }
      if (props.onMouseout) {
        chartInstance.value.on('mouseout', (event) => {
          props.onMouseout(event, chartInstance.value, props.option);
        });
      }
      if (props.onClick) {
        chartInstance.value.on('click', (event) => {

          props.onClick(event, chartInstance.value, props.option);
        });
      }

      chartInstance.value.on('mouseover', (event) => {
        emit('chartMouseover', event, chartInstance.value, props.option)
      })
      chartInstance.value.on('mouseout', (event) => {
        emit('chartMouseout', event, chartInstance.value, props.option)
      })
      chartInstance.value.on('click', (event) => {
        emit('chartClick', event, chartInstance.value, props.option)
      })

      draw();
    }
  };

  // 窗口自适应并开启过渡动画
  const resize = () => {
    if (chartInstance.value) {
      chartInstance.value.resize({
        animation: {
          duration: 300
        }
      });
    }
  };

  // 自适应防抖优化
  const debouncedResize = debounce(resize, 500, {
    maxWait: 800
  });

  // 对父组件暴露获取 ECharts 实例的方法，可直接通过实例调用原生函数
  defineExpose({
    getInstance: () => chartInstance.value,
    resize,
    draw,
  });

  watch(props, () => {
    draw();
  });

  // 展示 loading 动画
  watch(
    () => props.loading,
    loading => {
      loading
        ?
        chartInstance.value.showLoading() :
        chartInstance.value.hideLoading();
    }
  );

  onMounted(() => {
    init();
    window.addEventListener('resize', debouncedResize);
  });

  onBeforeUnmount(() => {
    // 容器被销毁之后，销毁实例，避免内存泄漏
    chartInstance.value?.dispose();
    window.removeEventListener('resize', debouncedResize);
  });
</script>

<template>
  <div id="echart" ref="chartRef" :style="{ width: props.width, height: props.height }" />
</template>