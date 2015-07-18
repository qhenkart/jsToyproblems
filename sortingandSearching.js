
var merge = function(left, right){
  sorted = [];
  while(left.length && right.length){
    if(left[0] <= right[0]){
      sorted.push(left.shift());
    }else{
      sorted.push(right.shift());
    }
  }

  while(left.length){
    sorted.push(left.shift());
  }
  while(right.length){
    sorted.push(right.shift());
  }
  return sorted
}


var mergeSort = function(array){
  if(array.length < 2){
    return array;
  }

  var middle = Math.floor(array.length/2);
  var left = array.slice(0, middle);
  var right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));

}

var quickSort = function(array){

  if(array.length < 2){
    return array;
  }
  var low = [];
  var high = [];
  var pivot = Math.floor(array.length/2);
  array.forEach(function(el, i){
    if(el <= array[pivot] && i !== pivot){
      low.push(el);
    }else if(i !== pivot){
      high.push(el);
    }
  });
  return quickSort(low).concat(array[pivot]).concat(quickSort(high))
}





















