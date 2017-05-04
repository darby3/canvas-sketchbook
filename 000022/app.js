(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var ball1 = new Ball(75, "#111D4122");
    var ball2 = new Ball(75, "#44204E22");
    var ball3 = new Ball(75, "#87334922");
    var ball4 = new Ball(75, "#BE5D1922");

    ball1.x = canvas.width * .25;
    ball2.x = canvas.width * .75;
    ball3.x = canvas.width * .25;
    ball4.x = canvas.width * .75;

    ball1.y = ball2.y = canvas.height * .25;
    ball3.y = ball4.y = canvas.height * .75;

    ball1.scaleAngle = 0;
    ball2.scaleAngle = Math.PI * .25;
    ball3.scaleAngle = Math.PI * .5;
    ball4.scaleAngle = Math.PI * .75;

    var balls = [ ball1, ball2, ball3, ball4 ];

    var frameCounter = 0;
    var scene = 'b1';
    var maxFrames = 60;

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCounter++;

      if (frameCounter % maxFrames === 0) {
        frameCounter = 0;
      } 

      if (frameCounter < maxFrames * .25) {
        scene = 'b1';
      } else if (frameCounter < maxFrames * .5) {
        scene = 'b2';
      } else if (frameCounter < maxFrames * .75) {
        scene = 'b3';
      } else if (frameCounter < maxFrames) {
        scene = 'b4';
      }

      balls.forEach(function(b) {
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;
      })

      if (scene === 'b1') {
        ball1.draw(ctx);
      } else if (scene === 'b2') {
        ball2.draw(ctx);
      } else if (scene === 'b3') {
        ball3.draw(ctx);
      } else if (scene === 'b4') {
        ball4.draw(ctx);
      }
    }

    drawFrame();

  });
}());
