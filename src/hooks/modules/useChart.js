import {
  ref,
  shallowReactive,
  onUnmounted,
  onMounted,
} from "vue";
import * as echarts from "echarts";
import { debounce } from "@/utils";
export default function () {
  // 图表
  const chartInstance = shallowReactive({
    value: null,
  });
  // dom容器
  const containerRef = ref(null);

  onUnmounted(() => {
    chartInstance.value?.dispose();
    chartInstance.value = null;
    window.removeEventListener("resize", handleResizeScreen);
  });

  onMounted(() => {
    window.addEventListener('resize', handleResizeScreen)
  })
  /**
   * 处理屏幕尺寸变化
   */
  const handleResizeScreen = debounce(() => {
    // console.log(window.innerHeight,window.innerWidth); //获取屏幕的宽高
    if (chartInstance.value) {
      chartInstance.value.resize();
    }
  }, 100);

  return {
    chartInstance,
    echarts,
    containerRef,
  };
}
