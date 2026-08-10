import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Mosaic Backend Microservice Gateway', timestamp: new Date() });
});

app.get('/api/modules', (req, res) => {
  res.json({
    modules: [
      { name: 'auth', endpoint: 'http://localhost:3001' },
      { name: 'ecommerce', endpoint: 'http://localhost:3002' },
      { name: 'lifestyle', endpoint: 'http://localhost:3003' },
      { name: 'learning', endpoint: 'http://localhost:3004' },
      { name: 'health', endpoint: 'http://localhost:3005' },
    ]
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Mosaic Backend API listening on port ${port}`);
  });
}

export default app;
