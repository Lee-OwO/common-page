// import { ref, Ref } from 'vue';
import { Rocket, Shard } from '@/common/fireworks.ts';

export default function fireworks(
  fireCtx: CanvasRenderingContext2D,
  textCtx: CanvasRenderingContext2D,
  text: string
) {
  // const rocketList: Ref<Rocket[]> = ref([]);
  // const shardList: Ref<Shard[]> = ref([]);
  // const targetList: Ref<{ x: number; y: number }[]> = ref([]);
  // const counter: Ref<number> = ref(0);
  // const fidelity: Ref<number> = ref(3);
  const counter: { value: number } = {
    value: 0
  };
  const fidelity: { value: number } = {
    value: 3
  };
  const shardList: { value: Shard[] } = {
    value: []
  };
  const rocketList: { value: Rocket[] } = {
    value: []
  };
  const targetList: { value: { x: number; y: number }[] } = {
    value: []
  };

  const initTargetList = () => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
      return;
    }
    let fontSize = 200;
    let textWidth = 10000;
    const innerWidth = fireCtx.canvas.width;
    while (textWidth > innerWidth) {
      ctx.font = `${fontSize--}px Arial`;
      textWidth = ctx.measureText(text).width;
    }
    ctx.canvas.width = textWidth;
    ctx.canvas.height = fontSize * 1.5;
    ctx.fillStyle = '#fff';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(text, 0, fontSize);
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const offsetY = textCtx.canvas.height / 2 - fontSize / 2;
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      const alpha = imgData.data[i + 3];
      const x = Math.floor(i / 4) % imgData.width;
      const y = Math.floor(i / 4 / imgData.width);
      if (alpha && x % fidelity.value === 0 && y % fidelity.value === 0) {
        targetList.value.push({ x, y: y + offsetY });
      }
    }
  };
  const getTarget = () => {
    if (targetList.value.length > 0) {
      const index = Math.floor(Math.random() * targetList.value.length);
      const { x, y } = targetList.value[index];
      targetList.value.splice(index, 1);

      return { x, y };
    }
  };
  initTargetList();

  const rocketListDrew = () => {
    rocketList.value.forEach((rocket, index) => {
      rocket.draw();
      rocket.update();
      if (rocket.done) {
        rocket.explode(shardList.value, Shard, getTarget);
        rocketList.value.splice(index, 1);
      }
    });
  };
  textCtx.fillStyle = '#FFF';
  textCtx.shadowColor = '#FFF';
  textCtx.shadowBlur = 25;
  const shardListDrew = () => {
    shardList.value.forEach((s, i) => {
      s.draw();
      s.update();
      if (s.done) {
        if (s.target) {
          textCtx.fillRect(
            s.target.x,
            s.target.y,
            fidelity.value + 1,
            fidelity.value + 1
          );
        }
        shardList.value.splice(i, 1);
      }
    });
  };

  const loop = () => {
    counter.value = counter.value + 1;
    fireCtx.fillStyle = 'rgba(0, 0, 0, .1)';
    fireCtx.fillRect(0, 0, fireCtx.canvas.width, fireCtx.canvas.height);
    if (counter.value % 15 === 0) {
      rocketList.value.push(new Rocket(fireCtx));
    }
    rocketListDrew();
    shardListDrew();

    requestAnimationFrame(loop);
  };

  return {
    loop,
    initTargetList
  };
}
