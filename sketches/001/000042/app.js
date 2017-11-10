(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var myGrid = new Grid(20, 20);

    var ballRadius = myGrid.xGaps / 2;

    // draw balls there
    var balls = [];

    for (var r = 0; r < myGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 0,
            g: [125, 255],
            b: 100,
            o: [0.001, 0.02]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[r][c][0];
          newBall.y = myGrid.gridMatrix[r][c][1];

          newBall.centerX = newBall.x;
          newBall.centerY = newBall.y;

          newBall.lineWidth = 0.0025;

          balls.push(newBall);
        }
      }
    }

    var myOtherGrid = new Grid(20, 20);
    myOtherGrid.offset(myOtherGrid.xGaps / 2, myOtherGrid.yGaps / 2, true);

    var ballRadius = myOtherGrid.yGaps / 2;

    // draw balls there
    var otherBalls = [];

    for (var r = 0; r < myOtherGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myOtherGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip() && utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: [60, 90],
            g: [0, 25],
            b: [100, 150],
            o: [0.001, 0.02]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[r][c][0];
          newBall.y = myOtherGrid.gridMatrix[r][c][1];

          newBall.centerX = newBall.x;
          newBall.centerY = newBall.y;

          newBall.lineWidth = 0.5;
          newBall.strokeColor = "rgba(32, 32, 32, 0.15)";
          newBall.scaleSpeed = newBall.scaleSpeed * 0.5;
          newBall.centerScale = 2;
          newBall.rangeScale = 2;

          otherBalls.push(newBall);
        }
      }
    }

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      otherBalls.forEach(function(b) {
        // loop in a circle
        b.x = b.centerX + Math.sin(b.loopAngle) * b.loopRadius;
        b.y = b.centerY + Math.cos(b.loopAngle) * b.loopRadius;

        b.loopAngle += b.loopSpeed;

        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      })

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