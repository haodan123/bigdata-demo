<template>
  <div class="box-container">
    <div class="inner">
      <div class="boxTitle">
        {{ boxTitle }}
      </div>
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
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

    // background-color: #22222F;
    background-color: rgba(0,0,0,0.3);
    // background-color: #ffffff1a;
    // background: rgb(255, 255, 255);
    // background: linear-gradient(7deg, rgba(255, 255, 255, 0.3) 0%, rgba(137, 228, 247, 0.1) 100%);
    // padding: 8px;
    border-radius: 8px;
    border: 1px solid #56BDF9;
    border: 2rem solid transparent;
    border-width: 1.6rem 1.583rem 0.833rem 5.5rem;
    border-image: url('@/assets/boxContainer/boxbg2.png') 51 38 20 132;
    position: relative;
    box-sizing: border-box;

    .inner {
      padding: 1rem 0.7rem;
      position: absolute;
      top: -2.865rem;
      right: -2.083rem;
      bottom: -1.433rem;
      left: -6.5rem;
      overflow: hidden;
    }

    .boxTitle {
      color: #b3efff;
      position: relative;
      height: 38px;
      line-height: 38px;
      width: 100%;
      max-width: 100%;
      font-size: 16px;
      text-shadow: 2px 2px 4px #51bbf5;
      padding-left: 5%;
      display: flex;
      align-items: center;
    }

    .main-content {
      height: calc(100% - 38px);
      width: 100%;
    }
  }
</style>