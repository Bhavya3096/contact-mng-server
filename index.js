import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Router } from './routes/routes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
connectDB();
app.get('/', (req, res) => {
  res.send('API running ');
});
app.use('/contactmng', Router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is Running on port ${PORT}`);
});