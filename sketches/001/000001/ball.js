function Ball(radius, color) {
  if (radius === undefined) {
    radius = 40;
  }
  if (color === undefined) {
    color = "#ff0000";
  }

  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.rotation = 0;
  this.arcLength = 2 * Math.PI;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.strokeColor = "rgba(255, 255, 255, 0.75)";
  this.lineWidth = 1;
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
}