<template>
  <div class=" w-full h-full relative">
    <div class="w-full h-full flex gap-2">
      <!-- 左 -->
      <div class="flex-1 flex flex-col gap-2 justify-between ">
        <div class="h-1/3 w-full ">
          <boxContainer boxTitle="标题">
            <TongJixinxi></TongJixinxi>
          </boxContainer>
        </div>
        <div class="h-1/3 w-full ">
          <boxContainer1 boxTitle="标题">
            <TongJixinxi></TongJixinxi>
          </boxContainer1>
        </div>
        <div class="h-1/3 w-full ">
          <boxContainer2 boxTitle="标题">
            <HengXiangZhuZi></HengXiangZhuZi>
          </boxContainer2>
        </div>
      </div>
      <!-- 中 -->
      <div class="w-[44vw]">
        <MapIndex></MapIndex>
      </div>
      <!-- 右 -->
      <div class="flex-1 flex flex-col gap-2 justify-between">
        <div class="h-1/3 w-full ">
          <boxContainer3 boxTitle="标题">
            <JianZhuZhuang></JianZhuZhuang>
          </boxContainer3>
        </div>
        <div class="h-1/3 w-full ">
          <boxContainer3 boxTitle="标题">
            <LeiDaTu></LeiDaTu>
          </boxContainer3>
        </div>
        <div class="h-1/3 w-full ">
          <boxContainer boxTitle="标题">
            <LiFangZhuZi></LiFangZhuZi>
          </boxContainer>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
  import boxContainer from '@/components/boxContainer/index.vue';
  import boxContainer1 from '@/components/boxContainer-1/index.vue';
  import boxContainer2 from '@/components/boxContainer-2/index.vue';
  import boxContainer3 from '@/components/boxContainer-3/index.vue';
  import MapIndex from './components/MapIndex.vue'
  import TongJixinxi from './components/TongJixinxi.vue'
  import LiFangZhuZi from './components/LiFangZhuZi.vue'
  import LeiDaTu from './components/LeiDaTu.vue'
  import JianZhuZhuang from './components/JianZhuZhuang.vue'
  import HengXiangZhuZi from './components/HengXiangZhuZi.vue'


</script>

<style scoped lang="scss">
</style>