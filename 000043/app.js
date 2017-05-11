(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

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
            o: 1
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[r][c][0];
          newBall.y = myGrid.gridMatrix[r][c][1];

          balls.push(newBall);
        }
      }
    }

    // offset the grid, straight
    myGrid.offsetStraight(canvas.width / 2, 0);

    var moreBalls = [];

    for (var r = 0; r < myGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 255,
            g: 0,
            b: [100, 150],
            o: 0.5
          });

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myGrid.gridMatrix[r][c][0];
          newBall.y = myGrid.gridMatrix[r][c][1];

          moreBalls.push(newBall);
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
      });

      moreBalls.forEach(function(b) {
        b.draw(ctx);
      });
    }

    drawFrame();

  });
}());