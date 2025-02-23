import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.SUPABASE_DATABASE_URL,
});

async function checkDB() {
    try {
        const client = await pool.connect();
        console.log('✅ PostgreSQL connected successfully');
        client.release();
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
    }
}

checkDB();
export default pool;