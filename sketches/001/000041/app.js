(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var myGrid = new Grid(4, 4);

    var ballRadius = myGrid.xGaps / 2;

    // draw balls there
    var balls = [];

    for (var r = 0; r < myGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 0,
            g: [125, 255],
            b: 255,
            o: [0.01, 0.02]
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

    var myOtherGrid = new Grid(4, 4);
    myOtherGrid.offset(myOtherGrid.xGaps / 2, myOtherGrid.yGaps / 2, true);

    var ballRadius = myOtherGrid.yGaps / 2;

    // draw balls there
    var otherBalls = [];

    for (var r = 0; r < myOtherGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myOtherGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 120,
            g: [125, 255],
            b: 255,
            o: [0.01, 0.02]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[r][c][0];
          newBall.y = myOtherGrid.gridMatrix[r][c][1];

          newBall.centerX = newBall.x;
          newBall.centerY = newBall.y;

          newBall.lineWidth = 0.0025;
          newBall.scaleSpeed = newBall.scaleSpeed * 0.5;
          newBall.centerScale = 1;
          newBall.rangeScale = 1;

          otherBalls.push(newBall);
        }
      }
    }

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
    }

    drawFrame();

  });
}());