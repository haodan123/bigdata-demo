<template>
  <div class="box-container">
    <!-- <fourAngel> -->
    <div class="boxTitle">
      <div class="zfx">
        <div class="zfxson"></div>
      </div>
      {{ boxTitle }}
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
    <!-- </fourAngel> -->

  </div>
</template>
<script setup>
  // import fourAngel from '@/components/fourAngel/index.vue'
  defineProps({
    boxTitle: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  .box-container {
    width: 100%;
    height: 100%;
    // border-image: linear-gradient(0deg, #015eea, #00c0fa) 10 10;
    // box-shadow: 0 1px 0.365vw 0 rgba(56, 150, 255, .55);
    // background-color: rgba(127, 183, 208, 0.1);
    background-image: url("@/assets/boxContainer/boxbg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .boxTitle {
      color: #b3efff;
      position: relative;
      height: 38px;
      line-height: 38px;
      width: 100%;
      max-width: 100%;
      font-size: 16px;
      text-shadow: 2px 2px 4px #51bbf5;
      // background-color: rgba(4, 15, 53, 0.2);
      // padding-left: 2.375rem;
      // padding-top: .5rem;
      padding-left: 5%;
      display: flex;
      align-items: center;
    }

    .zfx {
      position: relative;
      width: 20px;
      height: 20px;
      border: 1px solid aqua;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;

    }

    .zfxson {
      width: 8px;
      height: 8px;
      background-color: aqua;
    }

    .main-content {
      height: calc(100% - 38px);
      width: 100%;
    }
  }
</style>