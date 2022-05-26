var http = require('http');
var fs = require('fs');
var url = require('url');
function templateHTML(title, _list,body){
  return `
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="index.html">WEB</a></h1>
      ${_list}
      ${body}
    </body>
    </html>
  `;
}
function templatelist(filelist){
  var list = '<ul>'
  var i = 0
  while(i<filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>'
  return list;
}


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello NodeJS';
          var list = templatelist(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
          response.writeHead(200);
          response.end(template);
        });

      }
      else{
        fs.readFile(`data/${queryData.id}`, 'utf-8',function(err, data){
          fs.readdir('./data',function(error, filelist){
            var title = queryData.id;
            var description = data;
            var list = '<ul>';
            var i = 0;
            while(i<filelist.length){
              list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
              i = i + 1;
            };
            list = list + '</ul>';
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        })
      };
    }
    else{
      response.writeHead(404);
      response.end('Not found');
      return;
    }
});

app.listen(3000);
