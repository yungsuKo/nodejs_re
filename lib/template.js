



module.exports = {
  html : function(title, _list,body, control){
    return `
      <html>
      <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="index.html">Web</a></h1>
        ${_list}
        ${control}
        ${body}
      </body>
      </html>
    `
  },
  list : function(filelist){
    var list = '<ul>'
    var i = 0
    while(i<filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>'
    return list
  }
}
