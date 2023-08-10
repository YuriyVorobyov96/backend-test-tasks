const http = require('http');
const CurrencyController = require('./src/app/currency.controller');

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && CurrencyController.getUrlsList().includes(req.url.toLowerCase())) {
      const result = CurrencyController.mapUrlToCurrency(req.url);
  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
