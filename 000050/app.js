(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // Lets make four grids
    var simpleGrid = new GridDimensional(10, 10, [0, 0], [canvas.width / 2, canvas.height / 2]);
    var angle = 12;
    var speed = 1;

    var allBalls = [];

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

    makeThingsFromGrid(simpleGrid.gridMatrix, allBalls, {
      r: 255,
      g: 0,
      b: 0,
      o: 0.5
    })

    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var radians = angle * Math.PI / 180;
      var vx = Math.cos(radians) * speed;
      var vy = Math.sin(radians) * speed;

      // Change the position of everything in the grid
      simpleGrid.offsetStraight(vx, vy);

      allBalls.forEach(function(b) {
        var gridPt = simpleGrid.gridMatrix[b.gridRef.r][b.gridRef.c];

        b.x = gridPt[0];
        b.y = gridPt[1];

        b.updateScale().draw(ctx);
      });

    }

    drawFrame();

  });
}());