const Box        = require('blessed').Box;
const { Canvas } = require('drawille-canvas-blessed-contrib');

class Circle extends Box {
  constructor(opts) {
    const { width, height } = opts.screen || opts;
    const ratio             = height > width ? width / height : height / width;
    const radius            = opts.diameter / 2;
    const circleWidth       = Math.round(width > height ? ratio * opts.diameter : opts.diameter);
    const circleHeight      = Math.round(height > width ? ratio * opts.diameter : opts.diameter);
    const options           = Object.assign({}, opts, {
      width  : `${circleWidth < radius ? radius : circleWidth}%`,
      height : `${circleHeight}%`,
    });
    super(options);
    this.options = options;
    this.on('attach', () => {
      this.calcSize();
      this._canvas  = new Canvas(this.canvasSize.width, this.canvasSize.height);
      this.context  = this._canvas.getContext();
      this.initialX = this.left;
      this.initialY = this.right;
      this.draw();
    });
  }
  render() {
    this.clearPos(true);
    const inner = this.context._canvas.frame();
    this.setContent(inner);
    return this._render();
  }
  calcSize() {
    this.canvasSize = { width : (this.width * 2) - 2, height : (this.height * 4) - 2 };
    if (this.canvasSize.width % 2 === 1) {
      this.canvasSize.width--;
    }
    if (this.canvasSize.height % 4 !== 1) {
      this.canvasSize.height += (this.canvasSize.height % 4);
    }
  }
  clear() {
    this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  }
  draw() {
    const { width, height } = this.canvasSize;
    const context = this.context;
    const points  = 360;
    let diameter    = this.options.diameter;
    const slice   = (2 * Math.PI) / points;
    const fill    = this.options.fill;
    context.strokeStyle = this.options.color;
    context.beginPath();
    if (fill) {
      while (diameter >= 0) {
        drawCircle({ points, slice, context, width, height, diameter });
        diameter--;
      }
    } else {
      drawCircle({ points, slice, context, width, height, diameter });
    }
    context.stroke();
    context.closePath();
  }
}

module.exports = Circle;

function drawCircle({ points, slice, context, width, height, diameter }) {
  for (let i = 0; i <= points; i++) {
    const angle = slice * (i - 90);
    context.lineTo(
      Math.round((width / 2) + (diameter * Math.cos(angle))),
      Math.round((height / 2) + (diameter * Math.sin(angle)))
    );
  }
}
