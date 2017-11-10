(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 9 / 16;

    // Other code
    var gridRows = 10;
    var gridColumns = Math.floor(gridRows * 16 / 9);

    var rowGaps = canvas.height / gridRows;
    var columnGaps = canvas.width / gridColumns;

    // This is a magic number.
    var ballRadius = rowGaps / 2.5;

    // make a matrix of grid coordinates
    var gridMatrix = [];

    // I got my math confused in earlier iterations of this, but didn't notice
    // until I stoppped using a square canvas.
    // 
    // On each pass through we're adding a matrix of points for each row.
    // On each row the y value will be the row value and so will be consistent.
    // The x value will change with each column as we pass through each row.
    // 
    // Variables written out below to make this more explicit.

    for (var i = 0; i <= gridRows; i++) {
      var rowMatrix = [];

      var rowYVal = rowGaps * i;

      for (var j = 0; j <= gridColumns; j++) {
        var colXVal = columnGaps * j;
        var gridPoint = [ colXVal, rowYVal ];
        rowMatrix.push(gridPoint);
      }

      gridMatrix.push(rowMatrix);
    }

    // draw balls there
    var balls = [];

    for (var i = 0; i < gridMatrix.length; i++) {
      for (var j = 0; j < gridMatrix[i].length; j++) {
        // if (utils.coinFlip()) {
          var newBall = new Ball(ballRadius, "#3087F305");
          newBall.x = gridMatrix[i][j][0];
          newBall.y = gridMatrix[i][j][1];

          newBall.centerX = newBall.x;
          newBall.centerY = newBall.y;

          balls.push(newBall);
        // }
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
    }

    drawFrame();

  });
}());