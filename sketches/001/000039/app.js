(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var myGrid = new Grid(8, 8);

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
            o: [0.1, 0.9]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[r][c][0];
          newBall.y = myGrid.gridMatrix[r][c][1];

          newBall.lineWidth = 0.25;

          balls.push(newBall);
        }
      }
    }

    var myOtherGrid = new Grid(8, 8);
    myOtherGrid.offset(myOtherGrid.xGaps / 2, myOtherGrid.yGaps / 2, true);

    var ballRadius = myOtherGrid.yGaps / 2;

    // draw balls there
    var otherBalls = [];

    for (var r = 0; r < myOtherGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myOtherGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 0,
            g: [125, 255],
            b: 255,
            o: [0.1, 0.9]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[r][c][0];
          newBall.y = myOtherGrid.gridMatrix[r][c][1];

          newBall.lineWidth = 0.25;

          otherBalls.push(newBall);
        }
      }
    }

    var myThirdGrid = new Grid(4, 4);

    var ballRadius = myThirdGrid.yGaps / 2;

    // draw balls there
    var thirdBalls = [];

    for (var r = 0; r < myThirdGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myThirdGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 0,
            g: [125, 255],
            b: 255,
            o: [0.1, 0.9]
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myThirdGrid.gridMatrix[r][c][0];
          newBall.y = myThirdGrid.gridMatrix[r][c][1];

          newBall.lineWidth = 0.25;

          thirdBalls.push(newBall);
        }
      }
    }


    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      })

      otherBalls.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      })

      thirdBalls.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      })

    }

    drawFrame();

  });
}());