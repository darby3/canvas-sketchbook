(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ball1 = new Ball(canvas.width / 8, "#ffffff00");
    var ball2 = new Ball(canvas.width / 8, "#ffffff00");
    var ball3 = new Ball(canvas.width / 8, "#ffffff00");
    var ball4 = new Ball(canvas.width / 8, "#ffffff00");

    ball1.strokeColor = "#DFF2E511";
    ball2.strokeColor = "#AAE2C511";
    ball3.strokeColor = "#C1EED811";
    ball4.strokeColor = "#8ABBA611";

    ball1.x = canvas.width * .25;
    ball2.x = canvas.width * .75;
    ball3.x = canvas.width * .25;
    ball4.x = canvas.width * .75;

    ball1.y = ball2.y = canvas.height * .25;
    ball3.y = ball4.y = canvas.height * .75;

    ball3.loopSpeed = ball3.loopSpeed * -1;
    ball4.loopSpeed = ball4.loopSpeed * -1;

    ball1.loopRadius = ball2.loopRadius = ball3.loopRadius = ball4.loopRadius = canvas.width / 4;

    ball1.scaleAngle = 0;
    ball2.scaleAngle = Math.PI / 2;
    ball3.scaleAngle = Math.PI / 2;
    ball4.scaleAngle = 0;

    var balls = [ ball1, ball2, ball3, ball4 ];

    balls.forEach(function(b) {
      b.centerX = b.x;
      b.centerY = b.y;
    });

    // a fun white pattern on top

    var controlBall = new Ball(canvas.width / 4, "#ffffff00");
    controlBall.strokeColor = "#4B4B63ff";
    
    controlBall.x = canvas.width / 2;
    controlBall.y = canvas.height / 2;

    controlBall.centerX = controlBall.x;
    controlBall.centerY = controlBall.y;

    controlBall.centerScale = 1.5;
    controlBall.rangeScale = 1.5;
    controlBall.scaleSpeed = 0.0275;

    controlBall.loopRadius = utils.getRandomArbitrary(1, canvas.width / 4);
    controlBall.loopSpeed = 0.025;
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

      balls.forEach(function(b) {
        // loop in a circle
        b.x = b.centerX + Math.sin(b.loopAngle) * b.loopRadius;
        b.y = b.centerY + Math.cos(b.loopAngle) * b.loopRadius;

        b.loopAngle += b.loopSpeed;

        // scale
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;
      })

      ball1.draw(ctx);
      ball2.draw(ctx);
      ball3.draw(ctx);
      ball4.draw(ctx);

      controlBall.draw(ctx);
    }

    drawFrame();

  });
}());
