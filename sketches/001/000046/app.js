(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Common
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Resize it
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // Lets make four grids
    var ulGrid = new GridDimensional(10, 10, [0, 0], [canvas.width / 2, canvas.height / 2]);
    var urGrid = new GridDimensional(10, 10, [canvas.width / 2, 0], [canvas.width, canvas.height / 2]);
    var llGrid = new GridDimensional(10, 10, [0, canvas.height / 2], [canvas.width / 2, canvas.height]);
    var lrGrid = new GridDimensional(10, 10, [canvas.width / 2, canvas.height / 2], [canvas.width, canvas.height]);

    var ulBalls = [];
    var urBalls = [];
    var llBalls = [];
    var lrBalls = [];

    var ballRadius = ulGrid.xGaps / 2;

    function makeThingsFromGrid(matrix, container, cfg) {
      for (var r = 0; r < matrix.length; r++) {
        for (var c = 0; c < matrix[r].length; c++) {
          var colStr = utils.getRandomColor(cfg);

          var newBall = new Ball(ballRadius, colStr);
          newBall.x = matrix[r][c][0];
          newBall.y = matrix[r][c][1];

          container.push(newBall);
        }
      }
    }

    makeThingsFromGrid(ulGrid.gridMatrix, ulBalls, {
      r: 255,
      g: 0,
      b: 0,
      o: 0.5
    })

    makeThingsFromGrid(urGrid.gridMatrix, urBalls, {
      r: 0,
      g: 255,
      b: 0,
      o: 0.5
    })

    makeThingsFromGrid(llGrid.gridMatrix, llBalls, {
      r: 0,
      g: 0,
      b: 255,
      o: 0.5
    })

    makeThingsFromGrid(lrGrid.gridMatrix, lrBalls, {
      r: 255,
      g: 0,
      b: 255,
      o: 0.5
    })


    // Draw loop
    function drawFrame() {
      requestAnimationFrame(drawFrame, ctx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ulBalls.forEach(function(b) {
        b.updateScale().draw(ctx);
      });

      urBalls.forEach(function(b) {
        b.updateScale().draw(ctx);
      });

      llBalls.forEach(function(b) {
        b.updateScale().draw(ctx);
      });

      lrBalls.forEach(function(b) {
        b.updateScale().draw(ctx);
      });
    }

    drawFrame();

  });
}());