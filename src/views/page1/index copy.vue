<template>
  <div class="bgtu h-screen w-screen  bg-cover bg-no-repeat">
    <!-- <dv-loading v-if="loading">Loading...</dv-loading> -->
    <div v-if="loading" class="text-red-600">Loading...</div>
    <div class=" relative overflow-hidden" v-else>
      <!-- 头部 -->
      <div class=" h-[100px] relative bg-cover ">
        <TopHeader></TopHeader>
      </div>
      <!-- 主体 -->
      <div class="h-[calc(100vh-100px)] p-1 flex ">
        <!-- 左 -->
        <div class="flex-1  mr-1 flex flex-col p-1 bg-opacity-50 gap-2">
          <div class="h-1/3  content-box">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)]">
              <TongJixinxi></TongJixinxi>
            </div>
          </div>
          <div class="h-1/3 content-box">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)]">
              <!--<Tdbingtu></Tdbingtu>-->
            </div>
          </div>
          <div class="h-1/3 content-box">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)] ">
              <HengXiangZhuZi></HengXiangZhuZi>
            </div>
          </div>
        </div>
        <!-- 中 -->
        <div class="w-[44vw]   bg-opacity-50 ">
          <div class="w-full h-full">
            <MapIndex></MapIndex>
          </div>
        </div>
        <!-- 右 -->
        <div class="flex-1   ml-1 flex flex-col p-1 bg-opacity-50 gap-2  ">
          <div class="h-1/3 content-box">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)]">
              <LiFangZhuZi></LiFangZhuZi>
            </div>
          </div>
          <div class="h-1/3 content-box ">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)] ">
              <LeiDaTu></LeiDaTu>
            </div>
          </div>
          <div class="h-1/3 content-box ">
            <div class="content-box-title">统计信息</div>
            <div class="w-full h-[calc(100%-28.4px)] ">
              <JianZhuZhuang></JianZhuZhuang>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import TopHeader from '@/components/TopHeader/index.vue';
import MapIndex from '@/components/page1/MapIndex.vue'
import TongJixinxi from '@/components/page1/TongJixinxi.vue'
import LiFangZhuZi from '@/components/page1/LiFangZhuZi.vue'
import LeiDaTu from '@/components/page1/LeiDaTu.vue'
import JianZhuZhuang from '@/components/page1/JianZhuZhuang.vue'
import HengXiangZhuZi from '@/components/page1/HengXiangZhuZi.vue'
// import Tdbingtu from '@/components/page1/Tdbingtu.vue'
import {
  ref,
  onMounted
} from "vue";

const loading = ref(true)
onMounted(() => {
  cancelLoading()
})

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
}
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