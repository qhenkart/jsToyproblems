//For BFS Search
var Queue = function(){
  var storage = [];
  this.push = function(item){
    storage.push(item);
  }
  this.pop = function(){
    return storage.shift();
  };
};
//===


var Tree = function(val){
  this.val = val;
  this.children = [];
}

Tree.prototype.addChild = function(val){
  this.children.push(new Tree(val));
}

Tree.prototype.contains = function(val){
  var result = false;
  if(this.val === val){
    result = true;
  }else{
    this.children.forEach(function(child){
      if(child.contains(val)){
        result = true;
      }
    });
  }

  return result;
}
Tree.prototype.BFS = function(val){
  var queue = new Queue();
  var tree, depth, child;
  queue.push({tree: this, depth: 0});

  while(item = queue.pop()){
    tree = item.tree;
    depth = item.depth;

    if(tree.val === val){
      return true;
    }
    for(var i = 0; i < tree.children.length; i++){
      child = tree.children[i];
      queue.push({tree: child, depth: depth + 1}); 
    }
  }
}





// var tree = new Tree(1)
// tree.addChild(2)
// tree.addChild(3)
// tree.children[0].addChild(4)
// tree.children[0].addChild(5)
// console.log(tree.BFS(5))


var BinarySearchTree = function(val){
  this.val = val;
  this.left = null;
  this.right = null; 
}

BinarySearchTree.prototype.addChild = function(val){
  if(val <= this.val){
    if(this.left === null){
      this.left = new BinarySearchTree(val);
    }else{
      this.left.addChild(val);
    }
  }else{
    if(this.right === null){
      this.right = new BinarySearchTree(val);
    }else{
      this.right.addChild(val)
    }
  }
}

BinarySearchTree.prototype.contains = function(val){
  if(this.val === val){
    return true
  }else{
    if(val < this.val && this.left){
      return this.left.contains(val)
    }else if(this.right){
      return this.right.contains(val);
    }
  }
  return "Not In Tree"
}

BinarySearchTree.prototype.isBalanced = function(){
  var height = 0;
  var recurse = function(tree, counter){
  var counter = counter || 0;
    if(!tree.left || !tree.right){

      if(height === 0){
        height = counter;
      }else if(height !== counter){
        height = false;
      }
    }
    if(tree.left){
      recurse(tree.left, counter + 1);
    }
    if(tree.right){
      recurse(tree.right, counter + 1);
    }

    return
  }

  recurse(this);
  return height;
}



// var tree = new BinarySearchTree(5)
// // tree.addChild(3);
// // tree.addChild(6);
// // tree.addChild(4);
// // tree.addChild(8);
// // tree.addChild(1);
// // tree.addChild(5);
// // tree.addChild(2);
// // tree.addChild(10);
// // tree.addChild(9)
// // tree.addChild(5)
// tree.addChild(3)
// tree.addChild(4)
// tree.addChild(7)
// tree.addChild(6)
// tree.addChild(2)
// tree.addChild(8)
// // console.log(tree)
// console.log(tree.isBalanced())

var Graph = function(){
  this.nodes = {};
}

Graph.prototype.addNode = function(node){
  if(node){
    this.nodes[node] = this.nodes[node] || {edges: []};
  }
};

Graph.prototype.contains = function(node){
  return !!this.nodes[node];
}

Graph.prototype.removeNode = function(node){
  if(this.contains(node)){
    var context = this;
    this.nodes[node].edges.forEach(function(edge){
      context.removeEdge(edge, node)
    });
    delete this.nodes[node];
  }
}

Graph.prototype.hasEdge = function(fromNode, toNode) {
  if(this.contains(fromNode) && this.contains(toNode)){
    return this.nodes[fromNode].edges.indexOf(toNode) !== -1;
  }
};

Graph.prototype.addEdge = function(fromNode, toNode){
  if(this.contains(fromNode) && this.contains(toNode)){
    if(!this.hasEdge(fromNode, toNode)){
      this.nodes[fromNode].edges.push(toNode);
    }
    if(!this.hasEdge(toNode, fromNode)){
      this.nodes[toNode].edges.push(fromNode);
    }
  }
}

Graph.prototype.removeEdge = function(fromNode, toNode){
  var index = this.nodes[fromNode].edges.indexOf(toNode);
  if(index !== -1) this.nodes[fromNode].edges.splice(index, 1);
  index = this.nodes[toNode].edges.indexOf(fromNode);
  if(index!== -1) this.nodes[toNode].edges.splice(index, 1);
}


var DirectedGraph = function(){
  Graph.call(this);
}
DirectedGraph.prototype = Object.create(Graph.prototype);
DirectedGraph.prototype.constructor = 'DirectedGraph';

DirectedGraph.prototype.addEdge = function(fromNode, toNode){
  if(this.contains(fromNode) && this.contains(toNode) && !this.hasEdge(fromNode, toNode)){
    this.nodes[fromNode].edges.push(toNode);
  }
}
DirectedGraph.prototype.removeEdge = function(fromNode, toNode){
  var index = this.nodes[fromNode].edges.indexOf(toNode);
  if(index !== -1) this.nodes[fromNode].edges.splice(index, 1);
}

DirectedGraph.prototype.findRoute = function(fromNode, toNode){
  var traveled = {};
  var result = false;
  var recurse = function(node){
    node = node || fromNode;
    for(var i = 0; i < this.nodes[node].edges.length; i++){
      if(this.nodes[node].edges[i] === toNode){
        result = true
      }else if(!traveled[this.nodes[node].edges[i]]){
        traveled[this.nodes[node].edges[i]] = true;
        recurse.call(this, this.nodes[node].edges[i])
      }
    }
  }
  recurse.call(this)
  return result;
}

// var graph = new DirectedGraph();
// graph.addNode("quest")
// graph.addNode("jordan")
// graph.addNode("journey")
// graph.addNode("5")
// graph.addNode("6")
// graph.addNode("7")
// graph.addEdge('quest', 'journey')
// graph.addEdge('journey', 'jordan')
// graph.addEdge('journey', '5')
// graph.addEdge('5', 'quest')
// graph.addEdge('5', '6')
// graph.addEdge('7', 'quest')
// graph.addEdge('7', 'jordan')
// graph.addEdge('6', '7')
// graph.addEdge('6', '5')
// graph.addEdge('quest', 'jordan')
// // console.log(graph.removeNode('quest'))
// // graph.removeEdge('quest', 'journey')
// // console.log(graph.hasEdge('quest', 'journey'))
// console.log(graph.findRoute('quest', '7'))
// console.log(graph.nodes)


var convertSortedArrayToTree = function(arr, tree){
  debugger
  var arr = helper(arr);
  if(tree){
    tree.addChild(arr[2]);
  }else{
    tree = new BinarySearchTree(arr[2])
  }

  if(arr[0].length>2){
    convertSortedArrayToTree(arr[0], tree);
  }else{
    arr[0].forEach(function(x){
      tree.addChild(x);
    });
  }

  if(arr[1].length>2){
    convertSortedArrayToTree(arr[1], tree);
  }else{
    arr[1].forEach(function(x){
      tree.addChild(x);
    });
  }

  function helper(array){
    var root = arr[Math.floor((arr.length-1)/2)];
    var first = arr.slice(0, Math.floor((arr.length-1)/2)).reverse();
    var second = arr.slice(Math.floor((arr.length/2-1)+1));
    if(root === second[0]) second.shift();
    return [first, second, root]
  }
  return tree
}

// var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
// var tree = convertSortedArrayToTree(arr);
// console.log(tree.left)

var LinkedList = function(){
  this.head = null;
  this.tail = null;
}
var Node = function(val){
  this.val = val
  this.next = null;
}
LinkedList.prototype.addNode = function(val){
  var node = new Node(val);
  if(!this.head){
    this.head = node;
    this.tail = node;
  }else{
    this.tail.next = node;
    this.tail = node;
  }
}

var convertTreeToList = function(tree){
  var lists = {};
  // lists[1] = new LinkedList();
  // lists[1].addNode(tree.val);
  
  var inner = function(tree, count){
    count = count || 1;
    if(!tree){
      return;
    }
    lists[count] = lists[count] || new LinkedList();
    lists[count].addNode(tree.val);

    if(tree.left){
      inner(tree.left, count+1);
    }
    if(tree.right){
      inner(tree.right, count+1);
    }
  }
  inner(tree);
  return lists;
}

var BinaryTree = function(val){
  BinarySearchTree.call(this)
  this.val = val;
  this.leftLength = 0;
  this.rightLength = 0;
}

BinaryTree.prototype = Object.create(BinarySearchTree.prototype);
BinaryTree.prototype.constructor = 'BinaryTree';

BinaryTree.prototype.addChild = function(val){
  if(this.left === null){
    this.leftLength++;
    this.left = new BinaryTree(val);
  }else if(this.right === null){
    this.rightLength++;
    this.right = new BinaryTree(val)
  }else if(this.leftLength <= this.rightLength){
    this.leftLength++;
    this.left.addChild(val);
  }else if(this.leftLength > this.rightLength){
    this.rightLength++;
    this.right.addChild(val);
  }
}

BinaryTree.prototype.contains = function(val){
  var result = false;
  var inner = function(node){
    node = node || this;
    if(node.val === val){
      result = true;
      return;
    }else {
      if(node.left && !result){
        inner(node.left);
      }
      if(node.right && !result){
        inner(node.right);
      }
    }
  }
  inner.call(this)
  return result;
}

BinaryTree.prototype.findParent = function(val1, val2){
  var result;
  var inner = function(node){
    debugger
    if(node.left&& !result){
      inner(node.left);
    }
    if(node.right&& !result){
      inner(node.right);
    }
    if(node.contains(val1) && node.contains(val2) && !result){
      result = node.val;
    }

  }
  inner(this)
  return result;
}

BinaryTree.prototype.findSum = function(sum){
  sum = sum || this.val;
  // node = node|| this;
  if(this.left){
    this.left.findSum(sum)
  }
}


var tree = new BinaryTree(5)
tree.addChild(3);
tree.addChild(2);
tree.addChild(4);
tree.addChild(8);
tree.addChild(7);
tree.addChild(9);
// console.log(tree)
console.log(tree.findSum(16))

