
//STACKS AND QUEUES

var Stack = function(){
  this.storage = [];
  this.size = 0;
  this.min = [];
}

Stack.prototype.push = function(val){
  this.storage.push(val);
  this.size++;
  if(this.min[this.min.length-1] >= val || !this.min.length){
    this.min.push(val);
  }
}

Stack.prototype.pop = function(){
  var result = this.storage.pop();
  if(this.size > 0) this.size--;
  if(result === this.min[this.min.length-1]){
    this.min.pop();
  }
  return result || "Stack is Empty";
}

Stack.prototype.min = function(){
  return this.min[this.min.length-1];
}
Stack.prototype.length = function(){
  return this.size;
}

var SetOfStacks = function(){
  Stack.call(this);
  this.limit = 3;
  this.stacks = 1;
  this.storage = [[]];
}

SetOfStacks.prototype = Object.create(Stack.prototype);
SetOfStacks.prototype.constructor = SetOfStacks;

SetOfStacks.prototype.push = function(val){
  if(this.size + 1 > 3){
    this.storage.push([]);
    this.stacks++;
    this.size = 0;
  }
  this.storage[this.storage.length-1].push(val);
  this.size++;
}

SetOfStacks.prototype.pop = function(){
  var result = this.storage[this.stacks-1].pop();
  if(this.size <= 1 && this.stacks > 1){
    this.storage.pop();
    this.stacks--;
    this.size = 3;
  }else if(this.size > 0){
    this.size--;
  }
  return result || "Stack is Empty"
}

var towersOfHanoi = function(size){
  var towerOne = new Stack();
  var towerTwo = new Stack();
  var towerThree = new Stack();
  for(var i = 1; i <= size; i++){
    towerOne.push(i)
  }

  var move = function(output, input){
    input.push(output.pop());
  }

  var recurse = function(n, from, to , via){
    if (n==0) return;

    recurse(n-1, from, via , to);

    move(from,to);
    
    recurse(n-1, via, to , from);
  }
  recurse(size, towerOne, towerThree,towerTwo)

  return towerThree.storage;

}


var QueueStack = function(){
  this.inputs = new Stack();
  this.outputs = new Stack();

}

QueueStack.prototype.enqueue = function(val){
  this.inputs.push(val);
}

QueueStack.prototype.dequeue = function(){
  if(this.outputs.length()>0){
    return this.outputs.pop()
  }else{
    for(var i = 0; this.inputs.length() > 0; i++){
      this.outputs.push(this.inputs.pop());
    }
  }
  return this.outputs.pop();

}

// var queue = new QueueStack();
// queue.enqueue(5)
// queue.enqueue(4)
// queue.enqueue(1)
// console.log(queue.dequeue())
// queue.enqueue(2)
// queue.enqueue(3)
// console.log(queue.dequeue())
// console.log(queue.dequeue())
// console.log(queue.dequeue())
// console.log(queue)

var AnimalQueue = function(){
  this.dogStorage = [];
  this.catStorage = [];
  this.timeStamp = 0
}

AnimalQueue.prototype.enqueue = function(animal, name){
  if(animal === 'cat'){
    this.catStorage.push([name, ++this.timeStamp]);
  }else{
    this.dogStorage.push([name, ++this.timeStamp]);
  }

}

AnimalQueue.prototype.dequeueAny = function(){
  if(this.peek(this.dogStorage)[1] < this.peek(this.catStorage[1])){
    return this.catStorage.shift()[0];
  }else{
    return this.dogStorage.shift()[0];
  }
}

AnimalQueue.prototype.dequeueDog = function(){
  return this.dogStorage.shift()[0];
}

AnimalQueue.prototype.dequeueCat = function(){
  return this.catStorage.shift()[0];
}

AnimalQueue.prototype.peek = function(storage){
  return storage[storage.length-1];
}


var animal = new AnimalQueue();
animal.enqueue('cat', 'jacob');
animal.enqueue('dog', 'bobby');
animal.enqueue('cat', 'sally');
console.log(animal.dequeueCat());
console.log(animal);