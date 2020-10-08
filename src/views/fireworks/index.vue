<template>
  <div class="fireworks">
    <canvas ref="fireworksCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from 'vue';
import firkworks from '@/hooks/firkworks';
import { useRoute } from 'vue-router';
import { getCommonDesDetail } from '@/api/commonDes.ts';

export default {
  setup() {
    const route = useRoute();

    const fireworksCanvas: Ref<HTMLCanvasElement | null> = ref(null);

    const width = 980;
    const height = 1745;

    const startLoop = (des: string) => {
      let fireCtx;
      if (fireworksCanvas.value) {
        fireworksCanvas.value.width = width;
        fireworksCanvas.value.height = height;
        fireCtx = fireworksCanvas.value.getContext('2d');
      }
      if (fireCtx) {
        firkworks(fireCtx, des).loop();
      }
    };

    const init = async () => {
      const { tag } = route.query;
      let text = '';
      let data;
      if (tag) {
        data = await getCommonDesDetail(String(tag));
      }
      if (data) {
        text = data.description;
      }
      startLoop(text);
    };
    onMounted(() => {
      init();
    });

    return {
      fireworksCanvas
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
