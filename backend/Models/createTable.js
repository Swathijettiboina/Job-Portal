import pool from './dbConnection.js';

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS companies (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      industry VARCHAR(100),
      location VARCHAR(255),
      founded_year INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log('✅ Table "companies" created successfully.');
    client.release();
  } catch (error) {
    console.error('❌ Error creating table:', error.message);
  }
}

createTable();
