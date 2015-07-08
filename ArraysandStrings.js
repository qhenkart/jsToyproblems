// STRINGS AND ARRAYS





//check to see if a string is filled with unique characters without using any Data structures other than Arrays
function unique(str){
  var map = [];
  for(var i = 0; i <=65; i++){
    map.push(false);
  }

  for(var j = 0; j < str.length; j++){
    if(map[str.charCodeAt(j) - 65]){
      return false;
    }else{
      map[str.charCodeAt(j) - 65] = true;
    }
  }
  
  return true;
}

//check to see if two strings are permutations of each other
function isPermutation(str1, str2){
  if(str1.split('').sort().join('') === str2.split('').sort().join('')){
    return true;
  }else{
    return false
  }
}

//reverse a string without using the reverse method
function reverse(str){
  str = str.split('')
  for(var i = 0; i < Math.floor(str.length/2); i++){
    var temp = str[i];
    str[i] = str[str.length - 1 - i];
    str[str.length-1-i] = temp;
  }
  return str.join('');
}

//turn a string such as aaaabbbbbccc into a4b5c3
function freq(str){
  var newString = '',
  previous = str[0],
  count = 0;
  for(var i = 0; i < str.length; i++){
    if(previous === str[i]){
      count++;
    }else{
      newString += previous + count;
      previous = str[i];
      count = 1;
    }
  }
  newString += previous + count;
  return newString.length > str.length ? str : newString;
}

function rotateMatrix(matrix){
  var rotated = [];
  for(var i = 0; i < matrix.length; i++){
    rotated.push([]);
  }

  for(var i = 0; i < matrix.length; i++){
    for(var j = 0; j < matrix.length; j++){
      rotated[j][matrix.length-1-i] = matrix[i][j] 
    }
  }
  return rotated;
}

//rotate a matrix in place by 90 degrees
function rotateMatrixInPlace(matrix){
  for(var layer = 0; layer < matrix.length / 2; layer++){
    var first = layer;
    var last = matrix.length-1-layer;
    for(var i = first; i < last; i++){
      var offset = i - layer;

      var top = matrix[first][i]
      //left to top
      matrix[first][i] = matrix[last - offset][first];

      //bottom to left
      matrix[last-offset][first] = matrix[last][last - offset];

      // right to bottom
      matrix[last][last-offset] = matrix[i][last];

      //top to right
      matrix[i][last] = top;
    }
  }
  return matrix
}

// var square = [[0,1,2],[3,4,5],[6,7,8]] //630 741 852
// square = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]] // 12 8 4 0   13 9 5 1   14 10 6 2   15 11 7 3
// square = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]]; // 20 15 10 5 0     21 16 11 6 1    22 17 12 7 2   23 18 13 8 3   24 19 14 9 4 

function setZeros(matrix){
  var map = {};
  for(var i = 0; i < matrix.length; i++){
    for(var j = 0; j < matrix[0].length; j++){
      if(matrix[i][j] === 0){
        map['row' + i] = true;
        map['col' + j] = true;
        matrix[i][j] = 0
      }
    }
  }
  for(var i = 0; i < matrix.length; i++){
    for(var j = 0; j < matrix[0].length; j++){
      if(map['row' + i] || map['col'+j]){
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
}
var square = [[0,1,2,3],[4,5,0,7],[8,9,10,11]]
// console.log(setZeros(square))

function isRotation(str1, str2){
  var newStr = str1+ str1;
  return newStr.indexOf(str2) > -1
  
}

// console.log(isRotation('waterbottle', 'erbottlewat'))






