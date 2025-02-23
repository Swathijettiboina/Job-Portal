import express from 'express';
import pool from './Models/dbConnection.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Job Portal API is running...');
});

// Test database connection on demand
app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        client.release();
        res.status(200).json({ message: '✅ Database connected successfully.' });
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        res.status(500).json({ message: '❌ Database connection failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
