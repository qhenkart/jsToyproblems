var boardMaker = function(x, y){
  var arr = [];
  for(var i = 0; i < y; i++){
    arr.push([]);
  }

  for(var i = 0; i < y; i++){
    for(var j=0; j < x; j++){
      arr[i][j] = x;
    }
  }
}

var robotPaths = function(x, y){
  // var board = boardMaker(x, y);
  debugger
  var count = 0;
  var endRow = x - 1;
  var endCol = y - 1;
  var inner = function(row, col){
    row = row || 0;
    col = col || 0;
    if(row === endRow && col === endCol){
      count++;
      return;
    }
    if(row + 1 <= x){
      inner(row+1, col);
    }
    if(col + 1 <= y){
      inner(row, col+1)
    }
  }
  inner();
  return count;
}

console.log(robotPaths(3,3))