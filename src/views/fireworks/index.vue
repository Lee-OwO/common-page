<template>
  <div class="fireworks">
    <canvas ref="fireworksCanvas"></canvas>
    <canvas ref="textCanvas"></canvas>
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
    const textCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    const width: Ref<number> = ref(980);
    const height: Ref<number> = ref(1745);

    const startLoop = (des: string) => {
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
        firkworks(fireCtx, textCtx, des).loop();
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
