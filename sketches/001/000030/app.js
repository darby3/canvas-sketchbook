(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Other code

    // Making grid coordinates. 

    function Grid(rows, columns) {
      // Compute the sizes of the spaces between the lines
      this.rowGaps = canvas.height / rows;
      this.columnGaps = canvas.width / columns;

      // make a matrix of grid coordinates
      this.gridMatrix = [];

      // See 000016
      for (var i = 0; i <= rows; i++) {
        var rowMatrix = [];

        var rowYVal = this.rowGaps * i;

        for (var j = 0; j <= columns; j++) {
          var colXVal = this.columnGaps * j;
          var gridPoint = [ colXVal, rowYVal ];
          rowMatrix.push(gridPoint);
        }

        this.gridMatrix.push(rowMatrix);
      }
    }

    // Lets make multiple grids!
    // Here's grid one.
    
    var myGrid = new Grid(15, 20);

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

    // Here's grid two.

    var myOtherGrid = new Grid(15, 20);

    var ballOtherRadius = myOtherGrid.rowGaps / 2;

    // draw balls there
    var ballsOther = [];

    for (var i = 0; i < myOtherGrid.gridMatrix.length; i++) {
      for (var j = 0; j < myOtherGrid.gridMatrix[i].length; j++) {
        if (utils.coinFlip()) {
          var colR = 255;
          var colG = 173;
          var colB = 255;

          var colStr = "rgba(" + colR + ", " + colG + ", " + colB + ", 0.95)";

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = myOtherGrid.gridMatrix[i][j][0];
          newBall.y = myOtherGrid.gridMatrix[i][j][1];

          newBall.lineWidth = 0.25;

          ballsOther.push(newBall);
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