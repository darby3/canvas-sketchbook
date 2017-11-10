(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var balls = [];

    for (var i = 0; i < 25; i++) {
      balls[i] = new Ball(getRandomArbitrary(1, 5), "rgba(25, " + getRandomArbitrary(100, 225) + ", 100, 0.05)");
    }

    // Other code


    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(function(b) {
        b.x = b.centerX + Math.sin(b.loopAngle) * b.loopRadius;
        b.y = b.centerY + Math.cos(b.loopAngle) * b.loopRadius;

        b.loopAngle += b.loopSpeed;

        b.draw(ctx);
      })
    }

    drawFrame();

  });
}());