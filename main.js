const http = require('http');

const todos = [
  { id: 1, text: 'Todo One'},
  { id: 2, text: 'Todo Two'},
  { id: 3, text: 'Todo Three'},
];

const server = http.createServer((rq, rs) => {
  // listening data from client
    const {method, url} = rq;
    let body =[];

    rq.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body);
    })

    let status = 404;
    const response = {
      success: false,
      result: [],
      error: ''
    };

    if (method === 'GET' && url === '/todos'){
      status = 200;
      response.success = true;
      response.result = todos;
    } else if (method === 'POST' && url === '/todos') {

      const { id, text } = JSON.parse(body);

      if (!id || !text) {
        status = 400;
        response.error = 'Please add id and text';
      } else {
        todos.push({id, text});
        status = 201;
        response.success = true;
        response.results = todos;
    }

    }
    rs.writeHead(status, {
      'Content-Type': 'apllication/json',
      'X-Powered-By': 'Node.js',
    });

    rs.end(JSON.stringify(response));
    });

port = 7007;
server.listen(port, () => {
  console.log(`Its already running!!! ${port}/`);
}); 