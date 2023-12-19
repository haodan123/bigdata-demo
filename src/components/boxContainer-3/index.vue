<template>
  <div class="box-container">
    <!-- <fourAngel> -->
    <!-- <div class="boxTitle">{{ boxTitle }}</div> -->
    <div class="boxtitle-tltle">
      <img class="zfx" src="@/assets/boxContainer/box1.png">
      <div class="rightline">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
    position: relative;
    background: url("@/assets/boxContainer/boxbg3.png") no-repeat;
    background-size: 100% 100%;

    // background-image: url("@/assets/boxContainer/boxbg.jpg");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;


    .boxtitle-tltle {
      height: 38px;
      line-height: 38px;
      font-size: 18px;
      font-weight: normal;
      color: #fff;
      color: #E5F7F9;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-shadow: 2px 2px 4px #51bbf5;
      position: relative;
      padding-left: 15px;
      display: flex;
      align-items: center;
      gap: 5px;

      .zfx {
        position: relative;
        width: 28px;
        height: 28px;
        // border: 1px solid aqua;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .rightline {
        position: absolute;
        right: 10px;
        bottom: 0;
        display: flex;
        gap: 8px;

        div {
          width: 10px;
          height: 1px;
          background: #01a0e5;
        }

        div:nth-child(1) {
          width: 100px;
        }
      }

    }

    .main-content {
      height: calc(100% - 38px);
      width: 100%;
    }
  }
</style>