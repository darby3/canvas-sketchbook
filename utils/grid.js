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
