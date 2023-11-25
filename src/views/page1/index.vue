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
          <boxContainer1 boxTitle="标题">
            <HengXiangZhuZi></HengXiangZhuZi>
          </boxContainer1>
        </div>
      </div>
      <!-- 中 -->
      <div class="w-[44vw]">
        <MapIndex></MapIndex>
      </div>
      <!-- 右 -->
      <div class="flex-1 flex flex-col gap-2 justify-between">
        <div class="h-1/3 w-full ">
          <boxContainer boxTitle="标题">
            <JianZhuZhuang></JianZhuZhuang>
          </boxContainer>
        </div>
        <div class="h-1/3 w-full ">
          <boxContainer boxTitle="标题">
            <LeiDaTu></LeiDaTu>
          </boxContainer>
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
  import MapIndex from './components/MapIndex.vue'
  import TongJixinxi from './components/TongJixinxi.vue'
  import LiFangZhuZi from './components/LiFangZhuZi.vue'
  import LeiDaTu from './components/LeiDaTu.vue'
  import JianZhuZhuang from './components/JianZhuZhuang.vue'
  import HengXiangZhuZi from './components/HengXiangZhuZi.vue'
 
</script>

<style scoped lang="scss">
  .bgtu {
    background: url('@/assets/ydj/bg02.png') center center no-repeat;

  }

  .bgtitle {
    background: url('@/assets/images/new/title.png') center center no-repeat;

  }

  .content-box {
    border-image: linear-gradient(0deg, #015eea, #00c0fa) 10 10;
    box-shadow: 0 1px 0.365vw 0 rgba(56, 150, 255, .55);
    background-color: rgba(127, 183, 208, 0.1);
  }

  .content-box-title {
    position: relative;
    height: 28.4px;
    line-height: 28.4px;
    width: 100%;
    max-width: 100%;
    font-size: 16px;
    color: #E5F7F9;
    background-image: url("@/assets/bama/title.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-shadow: 2px 2px 4px #51bbf5;
    background-color: rgba(4, 15, 53, 0.2);
    padding-left: 20px;

    span {
      padding-left: 20px;
    }

    &::before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 5px;
      width: 5px;
      height: 5px;
      content: '';
      border-radius: 50%;
      background-color: #fff;
    }
  }
</style>