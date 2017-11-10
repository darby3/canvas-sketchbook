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

/**
 *
 * At this point I think something funky happened in 000035 that I started to
 * unravel here. But at this point I'm tired and I'm not solving it here.
 *
 * OH! Wait. No. I got it. I forgot that my math is all a little weird. And
 * because I'm technically subtracting gridPoints backwards first, there's
 * actually "hidden" rows/columns in a lot of visual cases I've been playing
 * with.
 *
 * Basically long story short when it looks like I should be - 1'ing on the
 * lengths of things or the number of columns/rows, I actually don't need to,
 * because the array math is working out in my favor. But it's not very clear
 * right now and could be more clear.
 *
 * Also all of that is only really necessary if I'm trying to do a full fill of
 * an offset grid. If not a lot of the math goes away, I think. Because I can
 * just add the offset and be done with it. But I should worry about THAT after
 * I refactor things and clarify some property names.
 * 
 */

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
    var hOff = hpx % this.columnGaps;
    var negHOff = hOff - this.columnGaps;

    for (var r = 0; r < gridMatrix.length; r++) {
      for (var c = 0; c < gridMatrix[r].length; c++) {
        gridMatrix[r][c][0] = gridMatrix[r][c][0] + negHOff;
      }
    }
  }

  if (vpx > 0) {
    var vOff = vpx % this.rowGaps;
    var negVOff = vOff - this.rowGaps;

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
        var newX = gridMatrix[r][this.columns - 1][0] + this.columnGaps;
        var newY = gridMatrix[r][this.columns - 1][1]

        var newGridPoint = [ newX, newY ];
        gridMatrix[r].push(newGridPoint);
      }
    }

    if (vpx > 0) {
      var newFinalRow = [];

      var lastRow = gridMatrix[this.rows];

      for (var c = 0; c < this.columns + 1; c++) {
        var newGridPoint = [ lastRow[c][0], lastRow[c][1] + this.columnGaps ];
        newFinalRow.push(newGridPoint);
      }

      gridMatrix.push(newFinalRow);

      this.rows = this.rows + 1;
    }
  }

};