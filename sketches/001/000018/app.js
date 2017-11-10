(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var ball1 = new Ball(75);
    var ball2 = new Ball(75);

    ball1.x = canvas.width * .25;
    ball2.x = canvas.width * .75;

    ball1.y = ball2.y = canvas.height / 2;

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ball1.scaleX = ball1.scaleY = ball1.centerScale + Math.sin(ball1.scaleAngle) * ball1.rangeScale;
      ball1.scaleAngle += ball1.scaleSpeed;

      ball2.scaleX = ball2.scaleY = ball2.centerScale + Math.sin(ball2.scaleAngle) * ball2.rangeScale;
      ball2.scaleAngle += ball2.scaleSpeed;

      ball1.draw(ctx);
      ball2.draw(ctx);
    }

    drawFrame();

  });
}());