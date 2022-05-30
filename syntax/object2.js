// 배열과 객체로 데이터를 정리한다.
// 데이터 처리를 쉽게 만들어주는 것은 함수

function f2(){
  console.log(1+1);
  console.log(1+2);
}

// 조건문과 반복문은 값이 될 수 없음

var f = function(){
  console.log(1+1);
  console.log(1+2);
}
f()

var a = [f];
a[0]();

var o = {
  func : f
}
o.func();
