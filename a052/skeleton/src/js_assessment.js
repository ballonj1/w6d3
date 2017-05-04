// write String.prototype.mySlice. It should take a start index and an
// (optional) end index.
String.prototype.mySlice = function (start, end = (this.length)) {
  if (end > this.length){
    end = this.length;
  }
  let newString = "";
  for(let i = start; i < end; i++){
    newString = newString.concat(this[i]);
  }

  return newString;
};

"string".mySlice(1);

// write Array.prototype.myReduce (analogous to Ruby's Array#inject).
Array.prototype.myReduce = function(cb) {
  let sum = this[0];
  this.slice(1).forEach(x => {
    sum = cb(sum, x);
  });
  return sum;
};

// write Array.prototype.quickSort(comparator). Here's a quick refresher if
// you've forgotten how quickSort works:
//   - choose a pivot element from the array (usually the first)
//   - for each remaining element of the array:
//     - if the element is less than the pivot, put it in the left half of the
//     array.
//     - otherwise, put it in the right half of the array.
//   - recursively call quickSort on the left and right halves, and return the
//   full sorted array.

Array.prototype.quickSort = function(comparator){
  if (this.length <= 1){
    return this;
  }

  let pivot = this[0];
  let remaining = this.slice(1);
  let left = [];
  let right = [];

  if (typeof comparator !== "function"){
    comparator = (x, y) => {
      if (x < y){
        return -1;
      } else if (x === y) {
        return 0;
      } else if (x > y) {
        return 1;
      }
    };
  }

  remaining.forEach(x => {
    if (comparator(x, pivot) === -1){
      left.push(x);
    } else {
      right.push(x);
    }
  });

  return left.quickSort(comparator).concat([pivot]).concat(right.quickSort(comparator));
};

// write myFind(array, callback). It should return the first element for which
// callback returns true, or undefined if none is found.
let myFind = function(array, callback) {
  for(let i = 0; i < array.length; i++){
    if (callback(array[i])){
      return array[i];
    }
  }

  return undefined;
};

// write sumNPrimes(n)
let sumNPrimes = function(n) {
  if (n === 0) {
    return 0;
  }
  let primes = [];
  let i = 2;
  while (primes.length < n){
    if (isPrime(i)){
      primes.push(i);
    }
    i++;
  }

  let sum = primes[0];
  primes.slice(1).forEach(x => {
    sum += x;
  });
  return sum;
};

let isPrime = function(n) {
  let prime = true;
  for(let i = 2; i < n; i++){
    if (n % i === 0){
      prime = false;
    }
  }
  return prime;
};


// write Function.prototype.myBind.
Function.prototype.myBind = function(ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

// write Function.prototype.inherits.
Function.prototype.inherits = function(baseClass){
  this.prototype = Object.create(baseClass.prototype);
  this.prototype.constructor = this;
};
