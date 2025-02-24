require("dotenv").config();
 
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { createClient } = require("@supabase/supabase-js");
const userRoutes = require('./Routes/userRoutes'); 
// Debugging: Check if env variables are loading
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);
 
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("❌ Supabase credentials are missing. Check your .env file.");
}
 
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use('/api/users', userRoutes);

app.get("/", (req, res) => res.send("Job Portal Backend Running"));
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));