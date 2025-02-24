const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Function to authenticate user (Job Seeker or Recruiter)
const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  // Validate input
  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Email, password, and user type are required' });
  }

  // Choose the table based on userType
  const table = userType === 'jobSeeker' ? 'job_seekers' : 'recruiters';

  try {
    // Check if the email exists in the specified table
    const { data, error } = await supabase
      .from(table)
      .select('email, password')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the hashed password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, data.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successfully authenticated
    return res.status(200).json({ message: 'Login successful', user: data });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginUser };
