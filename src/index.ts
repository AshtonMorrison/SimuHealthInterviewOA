import express from 'express';
import todoRoutes from './routes/todo.route';


const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use('/todo', todoRoutes);

app.get('/test', (req, res) => {
    res.send('This is a test');
});

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
