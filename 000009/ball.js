
function Ball(radius, color) {
  if (radius === undefined) {
    radius = 40;
  }
  if (color === undefined) {
    color = "#ff0000";
  }

  this.x = 0;
  this.y = 0;

  this.loopRadius = utils.getRandomArbitrary(25, 400);
  this.loopSpeed = Math.random() * 0.015 * ((utils.coinFlip()) ? 1 : -1);
  this.loopAngle = Math.random() * 10;

  this.centerX = canvas.width / 2;
  this.centerY = canvas.height / 2;

  this.scaleAngle = Math.random() * 20;
  this.centerScale = 1;
  this.rangeScale = 5;
  this.scaleSpeed = utils.getRandomArbitrary(0.05, 0.9);

  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.rotation = 0;
  this.arcLength = 2 * Math.PI;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.strokeColor = "rgba(255, 255, 255, 0.05)";
  this.lineWidth = 4;
}

Ball.prototype.draw = function(context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.strokeStyle = this.strokeColor;
  context.beginPath();
    // x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.radius, 0, this.arcLength, true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Ball.prototype.getBounds = function() {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  }
};
