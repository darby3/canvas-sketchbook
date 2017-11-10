/**
 * Create a dimensonal grid. Give it a number of rows and columns, and UL and LR
 * coords in [ x, y ] format.
 */
function GridDimensional(rows, columns, ul, lr) {
  // Store the args for later reference
  this.rows = rows;
  this.columns = columns;
  this.ul = ul;
  this.lr = lr;

  // Set width and height values.
  this.width = lr[0] - ul[0];
  this.height = lr[1] - ul[1];

  // Compute the sizes of the spaces between the lines.
  this.yGaps = this.height / rows;
  this.xGaps = this.width / columns;

  // Make a matrix of grid coordinates. 
  this.gridMatrix = [];

  for (var r = 0; r <= rows; r++) {
    var rowMatrix = [];

    var rowYVal = this.yGaps * r + this.ul[1];

    for (var c = 0; c <= columns; c++) {
      var colXVal = this.xGaps * c + this.ul[0];

      var gridPoint = [ colXVal, rowYVal ];
      rowMatrix.push(gridPoint);
    }

    this.gridMatrix.push(rowMatrix);
  }
}

GridDimensional.prototype.offsetStraight = function(hpx, vpx) {
  // Sometimes, we just want to move the grid, don't tell me what I can and can
  // not do.

  var gridMatrix = this.gridMatrix;

  for (var r = 0; r < gridMatrix.length; r++) {
    for (var c = 0; c < gridMatrix[r].length; c++) {
      gridMatrix[r][c][0] = gridMatrix[r][c][0] + hpx;
    }
  }

  for (var r = 0; r < gridMatrix.length; r++) {
    for (var c = 0; c < gridMatrix[r].length; c++) {
      gridMatrix[r][c][1] = gridMatrix[r][c][1] + vpx;
    }
  }
};