import express from 'express';

const app = express();
const PORT: number = 3000;
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
