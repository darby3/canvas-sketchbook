(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var ball = new Ball(5);

    // Other code

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // code
      ball.x = ball.centerX + Math.sin(ball.loopAngle) * ball.loopRadius;
      ball.y = ball.centerY + Math.cos(ball.loopAngle) * ball.loopRadius;

      ball.loopAngle += ball.loopSpeed;

      ball.draw(ctx);
    }

    drawFrame();

  });
}());