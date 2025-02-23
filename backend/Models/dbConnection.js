import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.SUPABASE_DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Enable if needed
});

// Check database connection only once at startup
pool.connect()
    .then(client => {
        console.log('✅ PostgreSQL connected successfully');
        client.release();
    })
    .catch(error => console.error('❌ Database connection error:', error.message));

export default pool;
