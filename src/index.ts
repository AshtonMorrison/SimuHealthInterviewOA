import express from 'express';
import todoRoutes from './routes/todo.route';
import userRoutes from './routes/user.route';

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
