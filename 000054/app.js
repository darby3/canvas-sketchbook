(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var left = 0;
    var right = canvas.width;
    var top = 0;
    var bottom = canvas.height;

    // Lets make two grids
    var simpleGrid = new GridDimensional(10, 10, [0, 0], [canvas.width / 2, canvas.height / 2]);
    var angle = 45;
    var speed = 5;

    var radians = angle * Math.PI / 180;
    var vx = Math.cos(radians) * speed;
    var vy = Math.sin(radians) * speed;
    
    var otherGrid = new GridDimensional(10, 10, [canvas.width / 2, canvas.height / 2], [canvas.width, canvas.height ]);
    var otherAngle = -45;
    var otherSpeed = 5;

    var otherRadians = otherAngle * Math.PI / 180;
    var otherVx = Math.cos(otherRadians) * otherSpeed;
    var otherVy = Math.sin(otherRadians) * otherSpeed;

    // lets fill these grids with balls
    var ballRadius = simpleGrid.xGaps / 2;

    function makeThingsFromGrid(matrix, container, cfg) {
      for (var r = 0; r < matrix.length; r++) {
        for (var c = 0; c < matrix[r].length; c++) {
          var colStr = utils.getRandomColor(cfg);

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = matrix[r][c][0];
          newBall.y = matrix[r][c][1];

          // Store a reference to the grid matrix point on the ball itself
          newBall.gridRef = {
            r: r,
            c: c
          };

          container.push(newBall);
        }
      }
    }

    var allBalls = [];

    makeThingsFromGrid(simpleGrid.gridMatrix, allBalls, {
      r: [25, 255],
      g: 0,
      b: [25, 90],
      o: [0.05, 0.25]
    })

    var otherBalls = [];

    makeThingsFromGrid(otherGrid.gridMatrix, otherBalls, {
      r: [25, 90],
      g: 0,
      b: [25, 255],
      o: [0.05, 0.25]
    })




    var myGrid = new Grid(20, 20);

    var myBallRadius = myGrid.xGaps / 2;

    // draw balls there
    var balls = [];

    for (var r = 0; r < myGrid.gridMatrix.length; r++) {
      for (var c = 0; c < myGrid.gridMatrix[r].length; c++) {
        if (utils.coinFlip()) {
          var colStr = utils.getRandomColor({
            r: 0,
            g: [25, 155],
            b: 100,
            o: 0.025
          });

          var newBall = new Ball(myBallRadius, colStr);
          newBall.x = myGrid.gridMatrix[r][c][0];
          newBall.y = myGrid.gridMatrix[r][c][1];

          newBall.centerScale = 2;
          newBall.rangeScale = 2;
          newBall.scaleSpeed = 0.005;

          newBall.lineWidth = 0;

          balls.push(newBall);
        }
      }
    }

    var vr = 0;

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(vr);

      vr += 0.01;

      // Change the main boundaries of the grid

      simpleGrid.ul[0] += vx;
      simpleGrid.ul[1] += vy;
      simpleGrid.lr[0] += vx;
      simpleGrid.lr[1] += vy;

      // bounce check
      
      if (simpleGrid.lr[0] > right) {
        simpleGrid.lr[0] = right;
        vx *= -1;
      } else if (simpleGrid.ul[0] < left) {
        simpleGrid.ul[0] = left;
        vx *= -1;
      }

      if (simpleGrid.lr[1] > bottom) {
        simpleGrid.lr[1] = bottom;
        vy *= -1;
      } else if (simpleGrid.ul[1] < top) {
        simpleGrid.ul[1] = top;
        vy *= -1;
      }

      simpleGrid.offsetStraight(vx, vy);

      allBalls.forEach(function(b) {
        var gridPt = simpleGrid.gridMatrix[b.gridRef.r][b.gridRef.c];

        b.x = gridPt[0];
        b.y = gridPt[1];

        b.updateScale().draw(ctx);
      });




      // Change the main boundaries of the grid

      otherGrid.ul[0] += otherVx;
      otherGrid.ul[1] += otherVy;
      otherGrid.lr[0] += otherVx;
      otherGrid.lr[1] += otherVy;

      // bounce check
      
      if (otherGrid.lr[0] > right) {
        otherGrid.lr[0] = right;
        otherVx *= -1;
      } else if (otherGrid.ul[0] < left) {
        otherGrid.ul[0] = left;
        otherVx *= -1;
      }

      if (otherGrid.lr[1] > bottom) {
        otherGrid.lr[1] = bottom;
        otherVy *= -1;
      } else if (otherGrid.ul[1] < top) {
        otherGrid.ul[1] = top;
        otherVy *= -1;
      }

      otherGrid.offsetStraight(otherVx, otherVy);

      otherBalls.forEach(function(b) {
        var gridPt = otherGrid.gridMatrix[b.gridRef.r][b.gridRef.c];

        b.x = gridPt[0];
        b.y = gridPt[1];

        b.updateScale().draw(ctx);
      });


      balls.forEach(function(b) {
        // scale dramatically
        b.scaleX = b.scaleY = b.centerScale + Math.sin(b.scaleAngle) * b.rangeScale;
        b.scaleAngle += b.scaleSpeed;

        b.draw(ctx);
      });

      ctx.restore();

    }

    drawFrame();

  });
}());
