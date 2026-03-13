const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// collect default metrics
client.collectDefaultMetrics();

// create request counter
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests'
});

app.use((req, res, next) => {
  httpRequestsTotal.inc();
  next();
});

app.get('/', (req, res) => {
  res.send('DevOps Microservice Running 🚀');
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
