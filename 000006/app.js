(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var balls = [];

    for (var i = 0; i < 5; i++) {
      balls[i] = new Ball(getRandomArbitrary(10, 20), "rgba(0, 120, 220, 0.05)");
    }

    // Other code


    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(function(b) {
        // loop in a circle
        b.x = b.centerX + Math.sin(b.loopAngle) * b.loopRadius;
        b.y = b.centerY + Math.cos(b.loopAngle) * b.loopRadius;

        b.loopAngle += b.loopSpeed;

        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        // b.draw(ctx);
      })

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillStyle = "rgba(0, 120, 220, 0.05)";
      ctx.beginPath();
        ctx.moveTo(balls[0].x, balls[0].y);
        ctx.lineTo(balls[1].x, balls[1].y);
        ctx.lineTo(balls[2].x, balls[2].y);
        ctx.lineTo(balls[3].x, balls[3].y);
        ctx.lineTo(balls[4].x, balls[4].y);
        ctx.lineTo(balls[0].x, balls[0].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    drawFrame();

  });
}());