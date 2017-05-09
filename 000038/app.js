(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var myGrid = new Grid(8, 8);
    // myGrid.offset(myGrid.columnGaps / 2);

    var ballRadius = myGrid.rowGaps / 2;

    // draw balls there
    var balls = [];

    for (var i = 0; i < myGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myGrid.gridMatrix[i].length; j++) {
        if (utils.coinFlip()) {
          var colR = 0;
          var colG = utils.getRandomArbitrary(200, 230);
          var colB = utils.getRandomArbitrary(210, 255);

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.65)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[i][j][0];
          newBall.y = myGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;

          balls.push(newBall);
        }
      }
    }

    var myOtherGrid = new Grid(8, 8);
    myOtherGrid.offset(myOtherGrid.columnGaps / 2, myOtherGrid.rowGaps / 2, true);

    var ballRadius = myOtherGrid.rowGaps / 2;

    // draw balls there
    var otherBalls = [];

    for (var i = 0; i < myOtherGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myOtherGrid.gridMatrix[i].length; j++) {
        if (utils.coinFlip()) {
          var colR = 0;
          var colG = utils.getRandomArbitrary(0, 30);
          var colB = utils.getRandomArbitrary(210, 255);

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.25)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[i][j][0];
          newBall.y = myOtherGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;

          otherBalls.push(newBall);
        }
      }
    }

    var myThirdGrid = new Grid(4, 4);
    myThirdGrid.offset(myThirdGrid.columnGaps / 4, myThirdGrid.rowGaps / 4, true);

    var ballRadius = myThirdGrid.rowGaps / 2;

    // draw balls there
    var thirdBalls = [];

    for (var i = 0; i < myThirdGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myThirdGrid.gridMatrix[i].length; j++) {
        if (utils.coinFlip()) {
          var colR = 255;
          var colG = 255;
          var colB = 255;

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.75)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myThirdGrid.gridMatrix[i][j][0];
          newBall.y = myThirdGrid.gridMatrix[i][j][1];

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