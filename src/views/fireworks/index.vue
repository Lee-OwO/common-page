<template>
  <div class="fireworks">
    <canvas ref="fireworksCanvas"></canvas>
    <canvas class="text" ref="textCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from 'vue';
import firkworks from '@/hooks/firkworks';
export default {
  setup() {
    const fireworksCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    const textCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    const width: Ref<number> = ref(980);
    const height: Ref<number> = ref(1745);

    const startLoop = () => {
      let fireCtx, textCtx;
      if (fireworksCanvas.value && textCanvas.value) {
        fireworksCanvas.value.width = width.value;
        fireworksCanvas.value.height = height.value;
        fireCtx = fireworksCanvas.value.getContext('2d');

        textCanvas.value.width = width.value;
        textCanvas.value.height = height.value;
        textCtx = textCanvas.value.getContext('2d');
      }
      if (fireCtx && textCtx) {
        firkworks(fireCtx, textCtx, '节日快乐啊').loop();
      }
    };
    onMounted(() => {
      startLoop();
    });

    return {
      fireworksCanvas,
      textCanvas
    };
  }
};
</script>

<style lang="less" scoped>
.fireworks {
  width: 100vw;
  height: 100vh;
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
