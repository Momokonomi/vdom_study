import serveHandler from 'serve-handler';
import * as http from 'http';

const serve = http.createServer((request, response) => {
  return serveHandler(request, response);
});

serve.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});
