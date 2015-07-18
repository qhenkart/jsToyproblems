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

// console.log(robotPaths(3,3))




var spiralTraversal = function(matrix){
  var spiraled = [];
  var startRow = 0;
  var endCol = matrix[0].length - 1;
  var endRow = matrix.length - 1;
  var startCol = 0
  
  while(startRow <= endRow && startCol <= endCol){

    for(var i = startCol; i <= endCol; i++){
      spiraled.push(matrix[startRow][i]);
    }
    startRow++;

    for(var i = startRow; i <= endRow; i++){
      spiraled.push(matrix[i][endCol]);
    }
    endCol--;

    if(startRow <= endRow){
      for(var i = endCol; i >= startCol; i--){
        spiraled.push(matrix[endRow][i]);
      }
      endRow--;
    }

    if(startCol <= endCol){
      for(var i = endRow; i >= startRow; i-- ){
        spiraled.push(matrix[i][startCol])
      }
      startCol++;
      
    }
  }
  return spiraled
};
// var awkwardMatrix = [
//       [  1,  2,  3],
//       [  4,  5,  6],
//       [  7,  8,  9],
//       [ 10, 11, 12],
//       [ 13, 14, 15],
//       [ 16, 17, 18],
//       [ 19, 20, 21],
//       [ 22, 23, 24]
//     ];

// console.log(spiralTraversal(awkwardMatrix))
// console.log( spiralTraversal([
//       [1,2,3,4],
//       [5,6,7,8],
//       [9,10,11,12],
//       [13,14,15,16]
//     ]))
//1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10




/*
 * Design and implement an LRU, or Least Recently Used, cache.
 *
 * An LRU cache gives O(1) get(key) and set(key, val) operations,
 * much like a hashtable, but once it reaches its limit for stored
 * number of items, removes the least recently used (i.e. the oldest
 * by get-date) item from the cache in O(1) time.
 *
 * For instance:
 *
 * var cache = new LRUCache(3); // limit of 3 items
 * cache.set("item1", 1);
 * cache.set("item2", 2);
 * cache.set("item3", 3);
 * cache.set("item4", 4);
 *
 * cache.get("item3") //=> 3
 * cache.get("item2") //=> 2
 * // item1 was removed because it was the oldest item by insertion/usage
 * cache.get("item1") //=> null
 *
 * // item4 is removed to make room, because it is the oldest by usage,
 * // which takes priority.
 * cache.set("item5", 5);
 *
 * // item3 is also removed, because it was retrieved before item2 was
 * // last retrieved.
 * cache.set("item6", 6);
 *
 * You will need a doubly-linked list (provided).
 */


var LRUCache = function (limit) {
  this.cache = {};
  this.storage = new List();
  this.limit = limit;
  this.size = 0;
};

var LRUCacheItem = function (key, val) {
  this.key = key;
  this.val = val;
  this.node = null;
};

LRUCache.prototype.size = function () {
  return this.size;
};

LRUCache.prototype.get = function (key) {
  var item = this.cache[key];
  if(!item){
    return null
  }
  this.storage.moveToFront(item.node)
  return item.val;
};

LRUCache.prototype.set = function (key, val) {
  if(this.size + 1 > this.limit){
    var result = this.storage.pop();
    delete this.cache[result.key];
    this.size--;
  }
  var item = new LRUCacheItem(key, val)
  item.node = this.storage.unshift(item)
  this.cache[key] = item;
  this.size++;
};



var List = function () {
  this.head = null;
  this.tail = null;
};

var ListNode = function (prev, val, next) {
  this.prev = prev || null;
  this.val = val;
  this.next = next || null;
};

// Insert at the head of the list.
List.prototype.unshift = function (val) {
  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = new ListNode(null, val, null);
  // Not empty list.
  } else {
    this.head = new ListNode(null, val, this.head);
    this.head.next.prev = this.head;
  }

  return this.head;
};

// Delete at the head of the list.
List.prototype.shift = function () {
  // Empty list
  if (this.head === null && this.tail === null) {
    return null;
  // Not empty list.
  } else {
    var head = this.head;
    this.head = this.head.next;
    head.delete();
    return head.val;
  }
};

// Insert at the end of the list.
List.prototype.push = function (val) {
  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = new ListNode(null, val, null);
  // Not empty list.
  } else {
    this.tail = new ListNode(this.tail, val, null);
    this.tail.prev.next = this.tail;
  }

  return this.tail;
};

// Delete at the end of the list.
List.prototype.pop = function () {
  // Empty list
  if (this.head === null && this.tail === null) {
    return null;
  // Not empty list.
  } else {
    var tail = this.tail;
    this.tail = this.tail.prev;
    tail.delete();
    return tail.val;
  }
};

// Move a node to the front of the List
List.prototype.moveToFront = function (node) {
  if (node === this.tail) {
    this.pop();
  } else if (node === this.head) {
    return;
  } else {
    node.delete();
  }

  node.prev = node.next = null;

  // Don't delegate to shift, since we want to keep the same
  // object.

  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = node;
  // At least one node.
  } else {
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }
};

// Move a node to the end of the List
List.prototype.moveToEnd = function (node) {
  if (node === this.head) {
    this.shift();
  } else if (node === this.tail) {
    return;
  } else {
    node.delete();
  }

  // Don't delegate to push, since we want to keep the same
  // object.

  node.prev = node.next = null;

  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = node;
  // At least one node.
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
};

ListNode.prototype.delete = function () {
  if (this.prev) { this.prev.next = this.next; }
  if (this.next) { this.next.prev = this.prev; }
};


var cache = new LRUCache(3); // limit of 3 items
cache.set("item1", 1);
cache.set("item2", 2);
cache.set("item3", 3);
cache.set("item4", 4);
// console.log(cache.get("item3")) //=> 3
// console.log(cache.get("item2")) //=> 2
// item1 was removed because it was the oldest item by insertion/usage
// console.log(cache.get("item1")) //=> null
 // item4 is removed to make room, because it is the oldest by usage,
// which takes priority.
cache.set("item5", 5);
 // item3 is also removed, because it was retrieved before item2 was
// last retrieved.
cache.set("item6", 6);
// console.log(cache.get("item3")) //=> 3





var rockPaperScissors = function(gameLength){
  gameLength = gameLength || 3;
  var results = [];
  var game = ['Rock', 'Paper', 'Scissors'];

  var inner = function(play){
    play = play || [];
    if(play.length === gameLength){
      results.push(play);
      return;
    }

    for(var i=0; i < game.length; i++){
      inner(play.concat(game[i]));
    }
  }
  inner();
  return results;
}

console.log(rockPaperScissors(3))