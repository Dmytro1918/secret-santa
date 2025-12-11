import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.ts';
import participantRoutes from './routes/participantRoutes.ts';

dotenv.config();

dbConnect(); 

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Santa Backend API is running (TypeScript)!');
});
app.use('/api/participants', participantRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});