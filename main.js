var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template');
var path = require('path');
var sanitizeHtml = require('sanitize-html');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello NodeJS';
          var list = template.list(filelist);
          var html = template.html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`)
          response.writeHead(200);
          response.end(html);
        });

      }
      else{
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf-8',function(err, data){
          fs.readdir('./data',function(error, filelist){
            var title = queryData.id;
            var description = data;
            var sanitizeTitle = sanitizeHtml(title);
            var sanitizeDescription = sanitizeHtml(description);
            var list = template.list(filelist);
            var html = template.html(sanitizeTitle, list,
              `<h2>${sanitizeTitle}</h2>${sanitizeDescription}`,
              `<p><a href="/create">create</a></p>
              <p><a href="/update?id=${sanitizeTitle}">update</a></p>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizeTitle}">
                <input type="submit" value="delete">
              </form>`);
            response.writeHead(200);
            response.end(html);
          });
        })
      };
    }
    else if(pathname === "/create"){
      fs.readFile(`data/${queryData.id}`, 'utf-8',function(err, data){
        fs.readdir('./data',function(error, filelist){
          var title = queryData.id;
          var list = '<ul>';
          var i = 0;
          while(i<filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          };
          list = list + '</ul>';
          var html = template.html(title, list,
            `
            <form action = "http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><input type="submit"></p>
            </form>

            `,'');
          response.writeHead(200);
          response.end(html);
        });
      })
    }
    else if(pathname === "/create_process"){
      var body = '';
      request.on('data', function(data){
        body=body+data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8',
        function(err){
          response.writeHead(302, {'Location' : `/?id=${title}`});
          response.end("success");
        })
      });
    }
    else if(pathname === "/update"){
      fs.readFile(`data/${queryData.id}`, 'utf-8',function(err, data){
        fs.readdir('./data',function(error, filelist){
          var title = queryData.id;
          var description = data;
          var list = template.list(filelist);
          var html = template.html(title, list,
            `
            <form action = "http://localhost:3000/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value=${title}></p>
            <p><textarea name="description" placeholder="description">${description}</textarea></p>
            <p><input type="submit"></p>
            </form>
            `
            ,
            '<a href="/create">create</a>');
          response.writeHead(200);
          response.end(html);
        });
      })
    }
    else if(pathname === "/update_process"){
      var body = '';
      request.on('data', function(data){
        body=body+data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`,`data/${title}`,function(error){
          fs.writeFile(`data/${title}`, description, 'utf8',function(err){
             response.writeHead(302, {'Location' : `/?id=${title}`});
             response.end("success");
          })
        });
      });
    }
    else if(pathname === "/delete_process"){
      var body = '';
      request.on('data', function(data){
        body=body+data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${id}`, function(error){
          response.writeHead(302, {Location : `/`});
          response.end();
        })
      });
    }
    else{
      response.writeHead(404);
      response.end('Not found');
      return;
    }
});

app.listen(3000);
