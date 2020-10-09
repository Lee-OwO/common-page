import { Rocket, Shard, Dot } from '@/common/fireworks';
import { getTextCanvasData } from '@/utils/dom';
import { ref, Ref, watch } from 'vue';
const width = 980;
const height = 1745;
const fidelity = 3;

export default function fireworks(canvas: Ref<HTMLCanvasElement | null>) {
  const demo = ref(0)
  setTimeout(() => {
    demo.value = 10
  })

  let fireCtx: CanvasRenderingContext2D | null = null;
  let targetList: { x: number; y: number }[] = [];
  let dotList: Dot[] = [];
  const text = ref('');
  const shardList: Shard[] = [];
  const rocketList: Rocket[] = [];

  const dotListDrew = (fireCtx: CanvasRenderingContext2D) => {
    fireCtx.save();
    fireCtx.fillStyle = '#FFF';
    dotList.forEach(d => {
      fireCtx.fillRect(d.x, d.y, d.size, d.size);
    });
    fireCtx.restore();
  };

  const shardListDrew = () => {
    shardList.forEach((s, i) => {
      s.draw();
      s.update();
      if (s.done) {
        if (s.target) {
          dotList.push(new Dot(s.ctx, s.target.x, s.target.y, fidelity + 1));
        }
        shardList.splice(i, 1);
      }
    });
  };

  const getTarget = () => {
    if (targetList.length > 0) {
      const index = Math.floor(Math.random() * targetList.length);
      const { x, y } = targetList[index];
      targetList.splice(index, 1);

      return { x, y };
    }
  };
  const rocketListDrew = () => {
    rocketList.forEach((rocket, index) => {
      rocket.draw();
      rocket.update();
      if (rocket.done) {
        rocket.explode(shardList, Shard, getTarget);
        rocketList.splice(index, 1);
      }
    });
  };

  let counter = 0;
  const loop = (fireCtx: CanvasRenderingContext2D) => {
    counter = counter + 1;
    fireCtx.fillStyle = 'rgba(0, 0, 0, .1)';
    fireCtx.fillRect(0, 0, fireCtx.canvas.width, fireCtx.canvas.height);
    if (counter % 15 === 0) {
      rocketList.push(new Rocket(fireCtx));
    }
    rocketListDrew();
    shardListDrew();
    dotListDrew(fireCtx);

    requestAnimationFrame(() => {
      loop(fireCtx);
    });
  };

  const initCtx = (canvas: HTMLCanvasElement) => {
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  };
  const initTargetList = (fireCtx: CanvasRenderingContext2D, text: string) => {
    if (!text) return [];
    const canvasData = getTextCanvasData(text, fireCtx.canvas.width);
    if (!canvasData) return [];
    const { data: imgData, fontSize } = canvasData;
    const offsetY = fireCtx.canvas.height / 2 - fontSize / 2;
    const result = [];
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      const alpha = imgData.data[i + 3];
      const x = Math.floor(i / 4) % imgData.width;
      const y = Math.floor(i / 4 / imgData.width);
      if (alpha && x % fidelity === 0 && y % fidelity === 0) {
        result.push({ x, y: y + offsetY });
      }
    }
    return result;
  };
  watch(canvas, val => {
    console.log(val, 'new vallllllllllllllllllllllllll')
    if (!val) return;
    const ctx = initCtx(val);
    if (!ctx) return;
    fireCtx = ctx;
    if (text.value && targetList.length === 0 && dotList.length === 0) {
      targetList = initTargetList(fireCtx, text.value);
    }
    loop(fireCtx);
  });
  watch(text, val => {
    if (!fireCtx) return;
    dotList = [];
    targetList = initTargetList(fireCtx, val);
  });

  return {
    text,
    demo
  };
}
