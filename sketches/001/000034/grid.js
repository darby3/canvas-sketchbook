function Grid(rows, columns) {
  // Store the args for later reference
  this.rows = rows;
  this.columns = columns;

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

Grid.prototype.offset = function(hpx, vpx) {
  // When we "add" an offset, we'll subtract it from the main grid, and then add
  // a row and/or column to ensure it fully wraps off the screen.
  // 
  // So like if I have gridGaps of 50px and I want an offset of 10px I'm going
  // to take offset - gridGap (10 - 50) and start there (-40). Then I can add
  // another row/col off that updated grid.
  // 
  // There's probably a more efficient way to do this but right now, don't care.

  if (hpx > 0) {
    var hOff = hpx % this.columnGaps;
    var negHOff = hOff - this.columnGaps;

    var gridMatrix = this.gridMatrix;

    for (var r = 0; r < gridMatrix.length; r++) {
      for (var c = 0; c < gridMatrix[r].length; c++) {
        gridMatrix[r][c][0] = gridMatrix[r][c][0] + negHOff;
      }
    }
  }

  if (vpx > 0) {
    var vOff = vpx % this.rowGaps;
    var negVOff = vOff - this.rowGaps;

    var gridMatrix = this.gridMatrix;

    for (var r = 0; r < gridMatrix.length; r++) {
      for (var c = 0; c < gridMatrix[r].length; c++) {
        gridMatrix[r][c][1] = gridMatrix[r][c][1] + negVOff;
      }
    }
  }

};