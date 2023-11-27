<template>
  <div class="app-container">
    <TopHeader />
    <div class="main-container">
      <myLoading loadText v-if="loading">
        加载中
      </myLoading>
      <router-view v-slot="{ Component }" v-else>
        <Transition name="nested">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
  //  import { ELoading } from 'e-datav-vue3';


  import TopHeader from "@/components/TopHeader/index.vue"
  import myLoading from "@/components/myLoading/index.vue"
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



<style lang="scss" scoped>
  .app-container {
    width: 100%;
    // height: 100%;
    height: 100vh;
    position: relative;
    background: url('@/assets/ydj/bg02.png') center center no-repeat;
    background-size: cover;

    .main-container {
      //padding-top: 100px;
      height: calc(100% - 100px);
      box-sizing: border-box;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      width: 100%;
    }
  }

  /* 应用于嵌套元素的规则 */
  .nested-enter-active .inner,
  .nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
  }

  .nested-enter-from .inner,
  .nested-leave-to .inner {
    transform: translateX(30px);
    opacity: 0;
  }

  /* 延迟嵌套元素的进入以获得交错效果 */
  .nested-enter-active .inner {
    transition-delay: 0.25s;
  }
</style>