import express from 'express';
import todoRoutes from './routes/todo.route';
import userRoutes from './routes/user.route';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const PORT: number = 3000;

app.use(express.json());
app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

// Page not found response
app.use((_req, res) => {
    res.status(404).json({
        message: "Page not found",
    });
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
