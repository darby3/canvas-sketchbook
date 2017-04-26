(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var balls = [];
    var numBalls = utils.getRandomArbitrary(2, 6);

    for (var i = 0; i < numBalls; i++) {
      balls[i] = new Ball(utils.getRandomArbitrary(10, 20), "#24326664");
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

        b.draw(ctx);
      })

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#24326664";
      ctx.fillStyle = "#00000000";
      ctx.beginPath();
        ctx.moveTo(balls[0].x, balls[0].y);

        for (var bz = 1; bz < balls.length; bz++) {
          ctx.lineTo(balls[bz].x, balls[bz].y);
        }

        ctx.lineTo(balls[0].x, balls[0].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    drawFrame();

  });
}());