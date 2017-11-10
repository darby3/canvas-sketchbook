function Grid(rows, columns) {
  // Store the args for later reference
  this.rows = rows;
  this.columns = columns;

  // Compute the sizes of the spaces between the lines. Refactoring from 000038
  // to make the exact directions of the gaps more clear.
  this.yGaps = canvas.height / rows;
  this.xGaps = canvas.width / columns;

  // Make a matrix of grid coordinates. 
  // 
  // Refactoring a bit to use better variables.
  this.gridMatrix = [];

  for (var r = 0; r <= rows; r++) {
    var rowMatrix = [];

    var rowYVal = this.yGaps * r;

    for (var c = 0; c <= columns; c++) {
      var colXVal = this.xGaps * c;

      var gridPoint = [colXVal, rowYVal];
      rowMatrix.push(gridPoint);
    }

    this.gridMatrix.push(rowMatrix);
  }
}


Grid.prototype.offset = function(hpx, vpx, fill) {
  // When we "add" an offset, we'll subtract it from the main grid, and then add
  // a row and/or column to ensure it fully wraps off the screen. If we want to
  // "fill" the screen, that is. If not, we can just straight offset, it doesn't
  // matter. 
  // 
  // We probably also need width/height limiters in the original constructor.
  // 
  // So like if I have gridGaps of 50px and I want an offset of 10px I'm going
  // to take offset - gridGap (10 - 50) and start there (-40). Then I can add
  // another row/col off that updated grid.
  // 
  // There's probably a more efficient way to do this but right now, don't care.

  var gridMatrix = this.gridMatrix;

  if (hpx > 0) {
    var hOff = hpx % this.xGaps;
    var negHOff = hOff - this.xGaps;

    for (var r = 0; r < gridMatrix.length; r++) {
      for (var c = 0; c < gridMatrix[r].length; c++) {
        gridMatrix[r][c][0] = gridMatrix[r][c][0] + negHOff;
      }
    }
  }

  if (vpx > 0) {
    var vOff = vpx % this.yGaps;
    var negVOff = vOff - this.yGaps;

    for (var r = 0; r < gridMatrix.length; r++) {
      for (var c = 0; c < gridMatrix[r].length; c++) {
        gridMatrix[r][c][1] = gridMatrix[r][c][1] + negVOff;
      }
    }
  }

  // If we need a fill column, we go row by row and add it.
  // If we need a fill row, we jump to the end and add it.
  // If we need both, we do the column then the row, to catch the last corner.
  if (fill) {
    if (hpx > 0) {
      this.columns = this.columns + 1;

      for (var r = 0; r < gridMatrix.length; r++) {
        var newX = gridMatrix[r][this.columns - 1][0] + this.xGaps;
        var newY = gridMatrix[r][this.columns - 1][1]

        var newGridPoint = [newX, newY];
        gridMatrix[r].push(newGridPoint);
      }
    }

    if (vpx > 0) {
      var newFinalRow = [];

      var lastRow = gridMatrix[this.rows];

      for (var c = 0; c < this.columns + 1; c++) {
        var newGridPoint = [lastRow[c][0], lastRow[c][1] + this.xGaps];
        newFinalRow.push(newGridPoint);
      }

      gridMatrix.push(newFinalRow);

      this.rows = this.rows + 1;
    }
  }

};

Grid.prototype.offsetStraight = function(hpx, vpx) {
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