class Shard {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  hue: number;
  ttl: number;
  lightness: number;
  size: number;
  timer: number;
  target?: { x: number; y: number };
  done: boolean;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    hue: number,
    target?: { x: number; y: number }
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.lightness = 50;
    this.size = 15 + Math.random() * 10;
    const angle = Math.random() * 2 * Math.PI;
    const blastSpeed = 1 + Math.random() * 6;
    this.xSpeed = Math.cos(angle) * blastSpeed;
    this.ySpeed = Math.sin(angle) * blastSpeed;
    this.target = target;
    this.ttl = 100;
    this.timer = 0;

    this.done = false;
  }
  draw() {
    this.ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
  update() {
    if (this.target) {
      this.updateToTarget();
    } else {
      this.updateToFall();
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
  updateToFall() {
    this.ySpeed += 0.05;
    this.size = this.lerp(this.size, 1, 0.05);

    if (this.y > this.ctx.canvas.height) {
      this.done = true;
    }
  }
  updateToTarget() {
    if (!this.target) {
      return;
    }
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const a = Math.atan2(dy, dx);
    const tx = Math.cos(a) * 5;
    const ty = Math.sin(a) * 5;
    this.size = this.lerp(this.size, 1.5, 0.05);

    if (dist < 5) {
      this.lightness = this.lerp(this.lightness, 100, 0.01);
      this.xSpeed = this.ySpeed = 0;
      this.x = this.lerp(this.x, this.target.x + 3 / 2, 0.05);
      this.y = this.lerp(this.y, this.target.y + 3 / 2, 0.05);
      this.timer += 1;
    } else if (dist < 10) {
      this.lightness = this.lerp(this.lightness, 100, 0.01);
      this.xSpeed = this.lerp(this.xSpeed, tx, 0.1);
      this.ySpeed = this.lerp(this.ySpeed, ty, 0.1);
      this.timer += 1;
    } else {
      this.xSpeed = this.lerp(this.xSpeed, tx, 0.02);
      this.ySpeed = this.lerp(this.ySpeed, ty, 0.02);
    }

    if (this.timer >= this.ttl || this.lightness >= 99) {
      this.done = true;
    }
  }
  removeTarget() {
    this.target = undefined
  }
  lerp(a: number, b: number, t: number) {
    return Math.abs(b - a) > 0.1 ? a + t * (b - a) : b;
  }
}
class Rocket {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  angle: number;
  blastSpeed: number;
  shardCount: number;
  xSpeed: number;
  ySpeed: number;
  hue: number;
  done: boolean;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    const quarterW = ctx.canvas.width / 4;
    this.x = quarterW + Math.random() * quarterW * 2;
    this.y = ctx.canvas.height - 15;
    this.angle = (Math.random() * Math.PI) / 4 - Math.PI / 6;
    this.blastSpeed = 10 + Math.random() * 7;
    this.shardCount = 50 + Math.floor(Math.random() * 20);
    this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
    this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
    this.hue = Math.floor(Math.random() * 360);

    this.done = false;
  }
  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
    this.ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.fillRect(0, 0, 5, 15);
    this.ctx.restore();
  }
  update() {
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    this.ySpeed += 0.1;

    if (this.ySpeed > 0) {
      this.done = true;
    }
  }
  //  爆炸
  explode<T>(
    shardList: T[],
    shardcon: new (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      hue: number,
      target?: { x: number; y: number }
    ) => T,
    getTarget: any = () => {}
  ) {
    for (let i = 0; i < this.shardCount; i++) {
      if (typeof shardcon === 'function') {
        shardList.push(
          new shardcon(this.ctx, this.x, this.y, this.hue, getTarget())
        );
      }
    }
  }
}

class Dot {
  x: number;
  y: number;
  size: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
  }
  drew() {
    this.ctx.save();
    this.ctx.fillStyle = '#FFF';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.restore();
  }
}

export { Rocket, Shard, Dot };
