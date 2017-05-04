(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var ball1 = new Ball(75, "#ffffff00");
    var ball2 = new Ball(75, "#ffffff00");
    var ball3 = new Ball(75, "#ffffff00");
    var ball4 = new Ball(75, "#ffffff00");

    ball1.strokeColor = "#111D4122";
    ball2.strokeColor = "#44204E22";
    ball3.strokeColor = "#87334922";
    ball4.strokeColor = "#BE5D1922";

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

    balls.forEach(function(b) {
      b.centerX = b.x;
      b.centerY = b.y;
    });

    // a fun white pattern on top

    var controlBall = new Ball(canvas.width / 4, "#ffffff00");
    controlBall.strokeColor = "#ffffff22";
    
    controlBall.x = canvas.width / 2;
    controlBall.y = canvas.height / 2;

    controlBall.centerX = controlBall.x;
    controlBall.centerY = controlBall.y;

    controlBall.centerScale = 2;
    controlBall.rangeScale = 1.5;
    controlBall.scaleSpeed = 0.0275;

    controlBall.loopRadius = 150;
    controlBall.loopSpeed = 0.15;
    controlBall.loopAngle = Math.random() * Math.PI;

    var frameCounter = 0;
    var scene = 'b1';
    var maxFrames = 240;

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

      controlBall.scaleX = controlBall.scaleY = controlBall.centerScale + Math.sin(controlBall.scaleAngle) * controlBall.rangeScale;
      controlBall.scaleAngle += controlBall.scaleSpeed;

      controlBall.x = controlBall.centerX + Math.sin(controlBall.loopAngle) * controlBall.loopRadius;
      controlBall.y = controlBall.centerY + Math.cos(controlBall.loopAngle) * controlBall.loopRadius;

      controlBall.loopAngle += controlBall.loopSpeed;

      controlBall.draw(ctx);

      balls.forEach(function(b) {
        // loop in a circle
        b.x = b.centerX + Math.sin(b.loopAngle) * b.loopRadius;
        b.y = b.centerY + Math.cos(b.loopAngle) * b.loopRadius;

        b.loopAngle += b.loopSpeed;

        // scale
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
