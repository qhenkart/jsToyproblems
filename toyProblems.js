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

function isPermutation(str1, str2){
  if(str1.split('').sort().join('') === str2.split('').sort().join('')){
    return true;
  }else{
    return false
  }
}

function reverse(str){
  str = str.split('')
  for(var i = 0; i < Math.floor(str.length/2); i++){
    var temp = str[i];
    str[i] = str[str.length - 1 - i];
    str[str.length-1-i] = temp;
  }
  return str.join('');
}


function freq(str){
  var newString, previous, count;
  newString = '';
  previous = str[0];
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

function test4()

console.log(test3('ttttteeeeasdfee'))
