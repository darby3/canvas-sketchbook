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

    ball1.scaleAngle = 0;
    ball2.scaleAngle = Math.PI / 2;

    var frameCounter = 0;
    var scene = 'b1';

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCounter++;

      if (frameCounter % 75 === 0) {
        scene = (scene === 'b1') ? 'b2' : 'b1';
        frameCounter = 0;
      } 

      ball1.scaleX = ball1.scaleY = ball1.centerScale + Math.sin(ball1.scaleAngle) * ball1.rangeScale;
      ball1.scaleAngle += ball1.scaleSpeed;

      ball2.scaleX = ball2.scaleY = ball2.centerScale + Math.sin(ball2.scaleAngle) * ball2.rangeScale;
      ball2.scaleAngle += ball2.scaleSpeed;

      if (scene === 'b1') {
        ball1.draw(ctx);
      } else if (scene === 'b2') {
        ball2.draw(ctx);
      }
    }

    drawFrame();

  });
}());
