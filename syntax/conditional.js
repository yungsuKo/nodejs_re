var args = process.argv;
console.log(args);
console.log(args[2]);

console.log('A');

if(true){
  console.log('B');
}
if(args[2] == 1){
  console.log('C1');
} else {
  console.log('C2');
}
if(true){
  console.log('D');
}
