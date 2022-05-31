// 잘 정리정돈할 필요성
// 객체의 상위개념으로 동작하는 것은 모듐


// var M = {
//   v:'v',
//   f:function(){
//     console.log(this.v);
//   }
// }
//
// M.f()

var part = require('./mparts.js')
console.log(part);
part.f();
