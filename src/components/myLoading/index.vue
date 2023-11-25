<template>
  <div class="myLoadingBox">
    <figure>
      <div class="loadingitem"></div>
      <div class="loadingitem"></div>
      <div class="loadingitem"></div>
    </figure>
    <div class="text-blue-400 mt-4 " v-if="loadText">
      <!-- {{loadText}} -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    loadText: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped lang="scss">
  $X:70deg;
  $color: #1ec0f5;
  $speed:1s;

  .myLoadingBox {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  figure {
    width: 150px;
    height: 150px;
    transform: translate(-50%, -65%);
    margin: 0;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .loadingitem {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .loadingitem:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-top: 25px solid $color;
    border-right: 5px solid $color;
    border-bottom: 10px solid transparent;
    border-left: 0px solid transparent;
    border-radius: 50%;
  }

  .loadingitem:nth-child(1):after {
    animation: ring $speed linear infinite;
    transform: rotateX($X) rotateY(0deg) rotate(0deg)
  }

  .loadingitem:nth-child(2):after {
    animation: ring2 $speed linear infinite;
    // animation-delay: ($speed / -2);
    animation-delay: calc($speed / -3);
    transform: rotateX($X) rotateY(60deg) rotate(0deg)
  }

  .loadingitem:nth-child(3):after {
    animation: ring3 $speed linear infinite;
    // animation-delay: ($speed / -3);
    animation-delay: calc($speed / -3);
    transform: rotateX($X) rotateY(-60deg) rotate(0deg)
  }

  @keyframes ring {
    100% {
      transform: rotateX($X) rotateY(0deg) rotate(360deg)
    }
  }

  @keyframes ring2 {
    100% {
      transform: rotateX($X) rotateY(60deg) rotate(360deg)
    }
  }

  @keyframes ring3 {
    100% {
      transform: rotateX($X) rotateY(-60deg) rotate(360deg)
    }
  }
</style>