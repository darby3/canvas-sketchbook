(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Other code
    var gridRows = Math.ceil((canvas.height / 30) + 1);
    var gridColumns = Math.ceil((canvas.width / 40) + 1); 

    var rowGaps = canvas.height / gridRows;
    var columnGaps = canvas.width / gridColumns;

    var ballRadius = rowGaps / 2.5;

    // make a matrix of grid coordinates
    var gridMatrix = [];

    // See 000016
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
        if (utils.coinFlip()) {
          var colR = 0;
          var colG = utils.getRandomArbitrary(200, 230);
          var colB = utils.getRandomArbitrary(210, 255);

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.65)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = gridMatrix[i][j][0];
          newBall.y = gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;


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