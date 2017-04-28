(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Other code
    var gridRows = 10;
    var gridColumns = 10;

    var rowGaps = canvas.height / gridRows;
    var columnGaps = canvas.width / gridColumns;

    var ballRadius = rowGaps / 2.5;

    // make a matrix of grid coordinates
    var gridMatrix = [];

    for (var i = 0; i <= gridRows; i++) {
      var rowMatrix = [];

      for (var j = 0; j <= gridColumns; j++) {
        var gridPoint = [ rowGaps * i, columnGaps * j];
        rowMatrix.push(gridPoint);
      }

      gridMatrix.push(rowMatrix);
    }


    // draw balls there
    var balls = [];

    for (var i = 0; i < gridMatrix.length; i++) {
      for (var j = 0; j < gridMatrix[i].length; j++) {
        if (utils.coinFlip()) {
          var newBall = new Ball(ballRadius);
          newBall.x = gridMatrix[i][j][0];
          newBall.y = gridMatrix[i][j][1];

          balls.push(newBall);
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
    }

    drawFrame();

  });
}());