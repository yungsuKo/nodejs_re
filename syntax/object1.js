var members = ['1','2','3']
console.log(members[0]);

var roles = {
  'programmer':'egoing',
  'designer':'123',
  'manager':'dd',
}
console.log(roles.manager);

var i = 0
while(i < members.length){
  console.log(members[i]);
  i ++;
}

for(var name in roles){
  console.log("object >",name, "value >", roles[name]);
}
