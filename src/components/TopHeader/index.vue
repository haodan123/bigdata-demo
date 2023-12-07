<template>
  <div class="top-header">
    <div class="title_left">
    </div>
    <h1 class="text-mid">大数据模版</h1>
    <div class="title_left">{{ '' }}</div>
    <div class="posright">
    </div>
  </div>
</template>
<script setup>

</script>


<style lang="scss" scoped>
  .top-header {
    position: relative;
    background: url('@/assets/topheader/header-bg.png') 0 0 / 100% 100% no-repeat; //默认标题  以下的注释标题都是可用的
    // background: url('@/assets/topheader/header.png') 0 0 / 100% 100% no-repeat; 
    // background: url('@/assets/topheader/titlebg.jpg') 0 0 / 100% 100% no-repeat; 
    // background: url('@/assets/topheader/titlebg2.png') 0 0 / 100% 100% no-repeat; 
    // background: url('@/assets/topheader/titlebg3.png') 0 0 / 100% 100% no-repeat; 
    // background: url('@/assets/topheader/homeTitle.jpg') 0 0 / 100% 100% no-repeat; 
    overflow: hidden;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    color: #fff;
    font-size: 20px;

    .title_left {
      width: 28%;
      height: 50px;
      bottom: 10px;
      left: 0;
      display: flex;
      // justify-content: space-around;
      justify-content: space-between;
    }

    .leftwl {
      cursor: pointer;
      background: url('@/assets/images/new/wl.png') no-repeat;
      background-size: cover;
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      //padding-top: 5px;
      font-size: calc(100vw * 18 / 1920);
    }

  }

  .text-mid {
    text-shadow: 2px 2px 4px #51bbf5;
    transform: translateY(-20%);
    font-size: 2em;
    font-weight: 700;
  }

  .title-button {
    width: 110px;
    font-size: .78125vw;
    background: #173e7f;
    color: #7cc4ec;
    margin-right: 6px;
    padding: 5px 15px;
    border: 1px solid #549ac0;
    position: absolute;
    right: 10px;
    top: 20px;
    text-align: center;
    z-index: 99;
    cursor: pointer;
  }

  .shouye:hover {
    color: red;
    cursor: pointer;
  }

  // .right-item:hover {
  //   color: red;
  //   cursor: pointer;
  // }

  .right-item {
    cursor: pointer;
    /* flex: 1; */
    padding: 0 10px;
    color: #3F83E8;
  }



  .posright {
    position: absolute;
    right: 0;
    height: 30px;
    align-items: center;
    bottom: 10px;
    color: #fff;
    display: flex;
    //width: 30%;
    width: calc(28vw - 5px);
    // width: calc(28vw);
    font-size: 14px;
  }

  .xiala1 {
    width: 180px;
    // height: 25px;
    z-index: 1000;
    outline: 0;

    background-color: #292836;
    color: white;
    border: 1px solid #85D5FA;
    padding: 3px;
    // font-size: calc(100vw * 10 / 1920);
    font-size: 8px;
    // background-color: rgba(127, 183, 208, 0.1);
    // background-color: #0F1735;
    // color: #999;
    border-radius: 10px;
    // background-color: rgba(255,255,255,0.5);
  }

  .bgx {
    // background-color: rgba(127, 183, 208, 0.1);
    // background-color: rgba(0, 0, 0, 0.7);
    // background-color: rgba(42, 140, 186, 0.7);
    // background-color: #3f83e8;

    //color: #999;
    color: #fff;
  }

  .title_button1 {
    cursor: pointer;
    width: 110px;
    position: relative;
    font-size: calc(100vw * 15 / 1920);
    //background: #173e7f;
    color: #7cc4ec;
    margin-right: 6px;
    padding: 5px 15px;
    border: #549ac0 1px solid;
    background: rgb(6, 14, 131);
    background: linear-gradient(0deg, rgba(42, 99, 184, 1) 0%, rgb(24, 38, 184) 100%);
    text-align: center;
    z-index: 99;

    &::after {
      position: absolute;
      content: "";
      width: 110px;
      height: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border-radius: 5px;
      background: rgb(0, 3, 255);
      background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
      // box-shadow:
      //   -7px -7px 20px 0px #fff9,
      //   -4px -4px 5px 0px #fff9,
      //   7px 7px 20px 0px #0002,
      //   4px 4px 5px 0px #0001;
      transition: all 0.3s ease;
    }

    &:hover:after {
      top: 0;
      height: 100%;
    }

    &:hover {
      background: rgb(0, 3, 255);
      color: #fff;
      background: linear-gradient(0deg, rgba(0, 3, 255, 1) 0%, rgba(2, 126, 251, 1) 100%);
    }
  }

  .acitve {
    // color: red;
    color: rgb(135, 235, 150);
  }
</style>