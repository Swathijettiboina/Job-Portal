require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
const supabase = require("./config/supabaseClient"); // Import Supabase client
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend's domain
  credentials: true,  // Allow sending cookies along with requests
}));
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);
app.use(express.json());
app.use(bodyParser.json()); // Ensure request body is parsed correctly

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Check Supabase connection on startup
  try {
    const { error } = await supabase.from("jobs").select("job_id").limit(1);
    if (error) {
      console.error("❌ Supabase connection failed:", error.message);
    } else {
      console.log("✅ Supabase connection successful!");
    }
  } catch (err) {
    console.error("❌ Unexpected error during Supabase connection check:", err);
  }
});
