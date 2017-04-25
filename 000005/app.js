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

        b.draw(ctx);
      })
    }

    drawFrame();

  });
}());