<template>
  <div class="box-container">
    <!-- <fourAngel> -->
      <div class="boxTitle">{{ boxTitle }}</div>
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
    border-image: linear-gradient(0deg, #015eea, #00c0fa) 10 10;
    box-shadow: 0 1px 0.365vw 0 rgba(56, 150, 255, .55);
    background-color: rgba(127, 183, 208, 0.1);

    .boxTitle {
      // height: 28px;
      // line-height: 28px;
      // text-align: center;
      // width: 100%;
      // font-size: 0.9rem;
      color: #b3efff;
      // font-family: '黑体';
      position: relative;
      height: 28.4px;
      line-height: 28.4px;
      width: 100%;
      max-width: 100%;
      font-size: 16px;
      background-image: url("@/assets/boxContainer/title.png");
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

    .main-content {
      height: calc(100% - 28px);
      width: 100%;
    }
  }
</style>