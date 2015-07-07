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



//LINKED LISTS

var LinkedList = function(){
  this.head = null;
  this.tail = null;
  this.count = 0;
}
var Node = function(val){
  this.val = val;
  this.next = null;
}

LinkedList.prototype.addNode = function(val){
  if(this.head === null){
    this.head = new Node(val);
    this.tail = this.head;
  }else{
    this.tail.next = new Node(val);
    this.tail = this.tail.next
  }
  this.count++;
}

LinkedList.prototype.size = function(){
  return this.count;
}

LinkedList.prototype.contains = function(val, node){
  node = node || this.head;
  if(val === node.val){
    return true;
  }else if(node.next === null){
    return false;
  }
  return this.contains(val, node.next)
}

LinkedList.prototype.remove = function(val, node){
  node = node || this.head;
  var result = "unable to find Node"
  if(val === this.head.val){
    result = this.head.val;
    this.head = this.head.next;
    this.count--;
  }else if(val === node.next.val){
    result = node.next.val
    node.next = node.next.next;
    this.count--;
  }else{
    result = this.remove(val, node.next)
  }
  return result;

}
LinkedList.prototype.removeDuplicates = function(){
  var count = 0;
  var hash = {};
  var node = this.head;
  hash[this.head.val] = true;
  while(node.next !== null){
    if(hash[node.next.val]){
      node.next = node.next.next;
      count++;
      this.count--;
    }else{
      hash[node.next.val] = true;
      node = node.next
    }
  }
  return count + " Duplicates Removed"
}

LinkedList.prototype.removeDuplicatesNoBuffer = function(){
  var currentNode = this.head;
  var count = 0;
  while(currentNode.next !== null){
    var runnerNode = currentNode;
    while(runnerNode.next !== null){
      if(currentNode.val === runnerNode.next.val){
        runnerNode.next = runnerNode.next.next;
        count++;
        this.count--;
      }else{
        if(runnerNode.next !== null) runnerNode = runnerNode.next;
      }
    }
    if(currentNode.next !== null) currentNode = currentNode.next;
  }
  return count + " Duplicates Removed"
}

LinkedList.prototype.findNthElement = function(n){
  var node = this.head;
  var counter = 1;
  var inspector = function(node){
    if(counter === this.count - n + 1){
      return node.val;
    }else if(node.next === null){
      return null;
    }else{
      counter++;
      return inspector(node.next);
    }
  }
  inspector = inspector.bind(this);
  return inspector(node);
}

var deleteNode = function(node){
  if(node.next === null) return null;
  node.val = node.next.val;
  node.next = node.next.next;
}

var wrapList = function(val, list){
  var lesser = new LinkedList();
  var greater = new LinkedList();
  var wrapped;
  while(list){
    if(list.val < val){
      lesser.addNode(list.val);
    }else if(list.val > val){
      greater.addNode(list.val);
    }else if(list.val === val){
      wrapped = new Node(val);
    }
    list = list.next
  }
  if(wrapped){
    lesser.tail.next = wrapped;
    lesser.tail = wrapped;
    lesser.count++;
  }
  lesser.tail.next = greater.head;
  lesser.tail = greater.tail;
  lesser.count += greater.count
  return lesser;
}

var addLinkedLists = function(list1, list2){
  var firstNum = [];
  var secondNum = [];

  while(list1){
    firstNum.push(list1.val);
    list1 = list1.next;
  }
  while(list2){
    secondNum.push(list2.val);
    list2 = list2.next;
  }
  return +(firstNum.reverse().join('')) + +(secondNum.reverse().join(''))
}

var list = new LinkedList();
list.addNode(4);
list.addNode(5);
list.addNode(6);
list.addNode(2);
list.addNode(3);
list.addNode(1);

var list1 = new LinkedList();
list1.addNode(5)
list1.addNode(2)
list1.addNode(4)
var list2 = new LinkedList();
list2.addNode(5)
list2.addNode(2)
list2.addNode(1)

console.log(addLinkedLists(list1.head, list2.head))
// console.log(list.removeDuplicatesNoBuffer())
// var newList = wrapList(3, list.head);
// console.log(newList.head.next.next.next)
// console.log(newList.size())
