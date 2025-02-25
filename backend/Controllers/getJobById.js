const supabase = require("../config/supabaseClient");

const getJobById = async (req, res) => {
  const { job_id } = req.params; // Extract job_id

  console.log("🔍 Requested Job ID:", job_id); // Debugging log

  if (!job_id) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  try {
    // Ensure job_id is a valid UUID
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_id", job_id) // Match by job_id
      .single(); // Fetch only one job

    if (error || !data) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job: data });
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getJobById;
