var fs = require('fs');
var http = require('http');
var WebSocketServer = require('websocket').server;
// Runs the server and sets 'handler' as callback function.
var server = http.createServer(handler).listen(8000);
console.log("------------- Server listening on port 8000 ------------- ");



function handler(req, res){
  console.log(req.url)
  if(req.url == "/toPython"){
    var body = "";
    req.on('data', chunk =>{
      // Loading the request body
      body += chunk.toString();
    }).on('end', () =>{
      fs.readFile(__dirname + '/tmp/MyAlgorithm-Template.py', (err, data) =>{
        if(err){
          res.writeHead(500);
          return res.end("Error loading page");
        }
        body = body.replace("myRobot = None", "myRobot = PiBot.dameRobot()");

        var fileStr = data.toString();
        fileStr = fileStr.replace("# Add your code here", body);

        fs.writeFileSync(__dirname + '/tmp/MyAlgorithm-TEST.py', fileStr, 'utf-8');
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end();
      });

    });
  }else{
    fs.readFile(__dirname + req.url, (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}


wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  console.log("Petición websocket recibida.")
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    // On message get the python content and write it on template 'ejercicio.py'
    var pythonCode = JSON.parse(message.utf8Data).content;
    
    // Create a new ZIP file
    newArchive(pythonCode, `test-${+new Date}.zip`, [
      'PiBot/PiBot.py',
      'PiBot/__init__.py',
      'PiBot/ejercicio.py',
      'PiBot/Kibotics.yml',
      'PiBot/real',
      'PiBot/real/__init__.py',
      'PiBot/real/piBot.py'
  ])
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});

const stat = require('fs').statSync;
const AdmZip = require('adm-zip');

function newArchive(pythonCode, zipFileName, pathNames) {
    const zip = new AdmZip();

    pathNames.forEach(path => {
        const p = stat(path);

        if (p.isFile() & (path != "PiBot/ejercicio.py")) {
          zip.addLocalFile(path);
        } else if (p.isDirectory()) {
          zip.addLocalFolder(path, path);
        } else if (path == 'PiBot/ejercicio.py'){
          var exerciseCode = injectCode(pythonCode, path);
          console.log(exerciseCode);
          zip.addFile(path, exerciseCode);
        }
    });

    zip.writeZip(zipFileName);

}

function injectCode(pythonCode, pathFile){
  // ERROR reading file...
  var content = fs.readFileSync(__dirname + '/' + pathFile, 'utf8');
  content = content.replace('# Insert code here', pythonCode);
  return content
}