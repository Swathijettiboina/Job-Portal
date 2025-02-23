import express from 'express';
import pool from './Models/dbConnection.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('🚀 Job Portal API is running...');
});

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    res.status(200).json({ message: '✅ Database connected successfully.' });
  } catch (error) {
    res.status(500).json({ message: '❌ Database connection failed.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
