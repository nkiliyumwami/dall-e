import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// initialize environment variables
dotenv.config();

//initialize express
const app = express();

//add middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//create api endpoints to hook into our frontend side
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//create routes
app.get('/', async (req, res) => {
  res.send('Hello from DALL-E!');
});

//start server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log('Server has started on port http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
