<template>
  <div class="fireworks">
    <canvas ref="fireworksCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from 'vue';
import useFirkworks from '@/hooks/firkworks';
import { useRoute } from 'vue-router';
import { getCommonDesDetail } from '@/api/commonDes.ts';

export default {
  setup() {
    const route = useRoute();
    const fireworksCanvas: Ref<HTMLCanvasElement | null> = ref(null);

    const { text, start } = useFirkworks();

    const init = async () => {
      const { tag } = route.query;
      let data;
      if (tag) {
        data = await getCommonDesDetail(String(tag));
      }
      if (data) {
        text.value = data.description;
      }
    };
    onMounted(() => {
      init();
      if (fireworksCanvas.value) {
        start(fireworksCanvas.value);
      }
    });

    return {
      fireworksCanvas,
      text
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
