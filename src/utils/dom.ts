export function getTextCanvasData(text: string, width:number) {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) {
    return null;
  }
  let fontSize = 400;
  let textWidth = 10000;
  const innerWidth = width;
  while (textWidth > innerWidth) {
    ctx.font = `${fontSize--}px Arial`;
    textWidth = ctx.measureText(text).width;
  }
  ctx.canvas.width = textWidth;
  ctx.canvas.height = fontSize * 1.5;
  ctx.fillStyle = '#fff';
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(text, 0, fontSize);
  return {
    data: ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height),
    fontSize,
    textWidth
  }
}
