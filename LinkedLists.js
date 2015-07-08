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

var circularLinkedList = function(list){
  var slowTracker = list.head.next;
  var fastTracker = list.head.next.next;
  while(fastTracker !== slowTracker){
    if(fastTracker.next === null){
      return "This is a functional LinkedList"
    } 
    fastTracker = fastTracker.next.next;
    slowTracker = slowTracker.next;
    
  }
  slowTracker = list.head
  while(fastTracker !== slowTracker){
    slowTracker = slowTracker.next
    fastTracker = fastTracker.next
  }
  return fastTracker;
}

var isPalindrome = function(list){
  var str = '';
  var node = list.head
  while(node){
    str += node.val;
    node = node.next;
  }
  return str === str.split('').reverse().join('');
}
//Tests: 
// var list = new LinkedList();
// list.addNode(1);
// list.addNode(2);
// list.addNode(3);
// list.addNode(4);
// list.addNode(5);
// list.addNode(7);
// list.addNode(8);
// list.addNode(9);
// list.addNode(10);
// list.addNode(11);
// list.addNode(12);
// // list.tail = list.head.next.next.next.next.next
// // list.head.next.next.next.next.next.next.next.next.next.next = list.tail
// // console.log(list.head.next.next.next.next.next.next.next.next.next.next)
// console.log(isPalindrome(list))


// var list1 = new LinkedList();
// list1.addNode(5)
// list1.addNode(2)
// list1.addNode(4)
// var list2 = new LinkedList();
// list2.addNode(5)
// list2.addNode(2)
// list2.addNode(1)

// console.log(addLinkedLists(list1.head, list2.head))
// console.log(list.removeDuplicatesNoBuffer())
// var newList = wrapList(3, list.head);
// console.log(newList.head.next.next.next)
// console.log(newList.size())
