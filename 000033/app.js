(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Other code

    // Moving the Grid function off to its own file.

    // Lets make multiple grids! And change their sizes!

    // Here's grid one.
    
    var myGrid = new Grid(10, 10);

    var ballRadius = myGrid.rowGaps / 2;

    // draw balls there
    var balls = [];

    for (var i = 0; i < myGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myGrid.gridMatrix[i].length; j++) {
        // if (utils.coinFlip()) {
          var colR = 0;
          var colG = utils.getRandomArbitrary(200, 230);
          var colB = utils.getRandomArbitrary(210, 255);

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.65)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[i][j][0];
          newBall.y = myGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;

          newBall.centerScale = 1;
          newBall.rangeScale = 1;

          balls.push(newBall);
        // }
      }
    }

    // Here's grid two.

    var myOtherGrid = new Grid(5, 5);

    var ballOtherRadius = myOtherGrid.rowGaps / 2;

    // draw balls there
    var ballsOther = [];

    for (var i = 0; i < myOtherGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myOtherGrid.gridMatrix[i].length; j++) {
        // if (utils.coinFlip()) {
          var colR = 255;
          var colG = 173;
          var colB = 255;

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.55)";

          var newBall = new Ball(ballOtherRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[i][j][0];
          newBall.y = myOtherGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 1;

          ballsOther.push(newBall);
        // }
      }
    }


    // Here's grid three.

    var myThirdGrid = new Grid(15, 15);

    var ballThirdRadius = myThirdGrid.rowGaps / 2;

    // draw balls there
    var ballsThird = [];

    for (var i = 0; i < myThirdGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myThirdGrid.gridMatrix[i].length; j++) {
        // if (utils.coinFlip() && utils.coinFlip()) {
          var colR = 126;
          var colG = 0;
          var colB = 226;

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.45)";

          var newBall = new Ball(ballThirdRadius, colStr);
          newBall.x = myThirdGrid.gridMatrix[i][j][0];
          newBall.y = myThirdGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;

          newBall.centerScale = 1;
          newBall.rangeScale = 1;

          ballsThird.push(newBall);
        // }
      }
    }


    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ballsThird.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      });

      balls.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      });

      ballsOther.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      });
    }

    drawFrame();

  });
}());
