<template>
  <div class="fireworks">
    <canvas ref="fireworksCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted, watch } from 'vue';
import useFirkworks from '@/hooks/firkworks';
import { useRoute } from 'vue-router';
import { getCommonDesDetail } from '@/api/commonDes.ts';

export default {
  setup() {
    const route = useRoute();
    const fireworksCanvas: Ref<HTMLCanvasElement | null> = ref(null);

    const { text, demo } = useFirkworks(fireworksCanvas);
    watch(demo, val => {
      console.log(val, 'outer demo change============');
    });

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
