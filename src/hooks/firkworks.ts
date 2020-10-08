import { Rocket, Shard } from '@/common/fireworks.ts';

export default function fireworks(
  fireCtx: CanvasRenderingContext2D,
  text: string
) {
  const fidelity = 3;

  const targetList: { x: number; y: number }[] = [];
  const initTargetList = () => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
      return;
    }
    let fontSize = 400;
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
    const offsetY = fireCtx.canvas.height / 2 - fontSize / 2;
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      const alpha = imgData.data[i + 3];
      const x = Math.floor(i / 4) % imgData.width;
      const y = Math.floor(i / 4 / imgData.width);
      if (alpha && x % fidelity === 0 && y % fidelity === 0) {
        targetList.push({ x, y: y + offsetY });
      }
    }
  };
  const getTarget = () => {
    if (targetList.length > 0) {
      const index = Math.floor(Math.random() * targetList.length);
      const { x, y } = targetList[index];
      targetList.splice(index, 1);

      return { x, y };
    }
  };

  const showText = !!text;
  if (showText) {
    initTargetList();
  }

  const textList: { x: number; y: number; size: number }[] = [];
  const textListDrew = () => {
    fireCtx.save();
    fireCtx.fillStyle = '#FFF';
    textList.forEach(t => {
      fireCtx.fillRect(t.x, t.y, t.size, t.size);
    });
    fireCtx.restore();
  };

  const shardList: Shard[] = [];
  const shardListDrew = () => {
    shardList.forEach((s, i) => {
      s.draw();
      s.update();
      if (s.done) {
        if (s.target) {
          textList.push({
            x: s.target.x,
            y: s.target.y,
            size: fidelity + 1
          });
        }
        shardList.splice(i, 1);
      }
    });
  };

  const rocketList: Rocket[] = [];
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
  const loop = () => {
    counter = counter + 1;
    fireCtx.fillStyle = 'rgba(0, 0, 0, .1)';
    fireCtx.fillRect(0, 0, fireCtx.canvas.width, fireCtx.canvas.height);
    if (counter % 15 === 0) {
      rocketList.push(new Rocket(fireCtx));
    }
    rocketListDrew();
    shardListDrew();
    textListDrew();

    requestAnimationFrame(loop);
  };

  return {
    loop,
    initTargetList
  };
}
