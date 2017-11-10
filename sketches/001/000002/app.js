(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("hello let us begin");

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // A circle
    var ball = new Ball(200, "rgba(0, 55, 65, 0.5)");
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.lineWidth = 0;

    // Have a start point going around a circle
    var point = {
      x: 0,
      y: 0,
    }

    var angle = 0;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    var radius = 200;
    var speed = 0.025;

    // Some style stuff
    ctx.strokeStyle = "rgba(255, 255, 255, 0.0125)";
    ctx.lineWidth = 10;

    // loop timer
    var loopTimer = 0;

    // Draw loop

    function drawFrame() {
      requestAnimationFrame(drawFrame, canvas);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update the point
      point.x = centerX + Math.sin(angle) * radius;
      point.y = centerY + Math.cos(angle) * radius;

      // Update the angle
      angle += speed;

      // Pick a random point
      var randomPoint = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      };

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(randomPoint.x, randomPoint.y);
      ctx.stroke();

      console.log(
        "loopTimer -- " + 
         loopTimer
      );
      if (loopTimer === 30) {
        ball.draw(ctx);
        loopTimer = 0;
      } else {
        loopTimer = loopTimer + 1;
      }
    }

    drawFrame();

  });
}());