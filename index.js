const RangeList = require('./src/rangeList')

let output;
const r1 = new RangeList();

r1.add([1,5])
output = r1.print() 
if ('[1 5)' === output) {
  console.log(output)
}

r1.add([10,20])
output = r1.print() 
if ('[1 5) [10 20)' === output) {
  console.log(output)
}

r1.add([20,20])
output = r1.print() 
if ('[1 5) [10 20)' === output) {
  console.log(output)
}

r1.add([20,21])
output = r1.print() 
if ('[1 5) [10 21)' === output) {
  console.log(output)
}

r1.add([2,4])
output = r1.print() 
if ('[1 5) [10 21)' === output) {
  console.log(output)
}

r1.add([3,8])
output = r1.print() 
if ('[1 8) [10 21)' === output) {
  console.log(output)
}

r1.remove([10,10])
output = r1.print() 
if ('[1 8) [10 21)' === output) {
  console.log(output)
}

r1.remove([10,11])
output = r1.print() 
if ('[1 8) [11 21)' === output) {
  console.log(output)
}

r1.remove([15,17])
output = r1.print() 
if ('[1 8) [11 15) [17 21)' === output) {
  console.log(output)
}

r1.remove([3,19])
output = r1.print() 
if ('[1 3) [19 21)' === output) {
  console.log(output)
}