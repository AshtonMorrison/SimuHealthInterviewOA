import express from 'express';

const app = express();
const PORT: number = 3000;
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('This is a test');
});

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
