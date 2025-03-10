const stripe = require("stripe")("sk_test_51QvgE2PttfWc6sY2ewvOg9axWMAtlENid66i2n435Uww7TA1mOXSqxCXCv86ICyoTEKi4TSiVZjGy91W4qvJP1hN00JO8o4rso");
const  supabase  = require("../config/supabaseClient");

/**
 * ✅ 1. Check if user is premium (by phone number)
 */
const checkPremium = async (req, res) => {
  try {
    const { number } = req.params;  // Get the number from the request parameter
console.log("number:", number);
    // Query Supabase to check if the user exists and has premium access
    const { data, error } = await supabase
      .from("premiumdata")
      .select("number")  // You only need number and plan
      .eq("number", number)     // Check if the number matches
      .single();                // Since we're expecting a single result

    if (error || !data) {
      console.error("User not found or error in query:", error);
      return res.status(404).json({ isPremium: false, message: "User does not have premium access" });
    }

    // If the user is found
    res.status(200).json({ isPremium: true, plan: data.plan, message: "User has premium access" });
  } catch (err) {
    console.error("Error checking premium status:", err);
    res.status(500).json({ isPremium: false, message: "Internal server error" });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const { plan, email, number } = req.body;

    // Validate input
    if (!plan || !email || !number) {
      return res.status(400).json({ error: "Plan, email, and number are required" });
    }

    // Use a single Price ID for all plans
    const priceId = 'price_1QvtfnPttfWc6sY2hsaf3cJb';  // Replace with your actual price ID

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: priceId,  // Single Price ID for all plans
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/haspremium',  // Redirect after success
      cancel_url: 'http://localhost:5173/getpremium',  // Redirect after cancel
    });

    // Save the user's email and number in your database (Supabase)
    const { data, error } = await supabase
      .from("premiumdata")
      .upsert({ user: email, number }, { onConflict: ["number"] });  // Store the email and number

    if (error) {
      console.error("❌ Error storing user data:", error.message);
      return res.status(500).json({ error: "Failed to store user data", details: error.message });
    }

    // Send the Checkout URL to the client
    res.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("❌ Error creating checkout session:", err.message);
    res.status(500).json({ error: "Failed to create checkout session", details: err.message });
  }
};


module.exports = { checkPremium, createCheckoutSession };

