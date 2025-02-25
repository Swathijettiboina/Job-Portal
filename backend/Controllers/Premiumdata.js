const stripe = require("stripe")("sk_test_51QvgE2PttfWc6sY2ewvOg9axWMAtlENid66i2n435Uww7TA1mOXSqxCXCv86ICyoTEKi4TSiVZjGy91W4qvJP1hN00JO8o4rso");
const { supabase } = require("../config/supabaseClient");

/**
 * ✅ 1. Check if user is premium (by phone number)
 */
const checkPremium = async (req, res) => {
  try {
    const { number } = req.params;

    const { data, error } = await supabase
      .from("premiumdata")
      .select("number, plan")
      .eq("number", number)
      .single();

    if (error || !data) {
      return res.status(404).json({ isPremium: false, message: "User does not have premium access" });
    }

    res.status(200).json({ isPremium: true, plan: data.plan, message: "User has premium access" });
  } catch (err) {
    console.error("Error checking premium status:", err);
    res.status(500).json({ isPremium: false, message: "Internal server error" });
  }
};

/**
 * ✅ 2. Create a Stripe Checkout Session
 */
const createCheckoutSession = async (req, res) => {
    try {
  

        const { plan, number } = req.body;
    
        // Validate required fields
        if (!plan || !number) {
          return res.status(400).json({ error: "Plan and number are required" });
        }
        const stripePriceId = 'price_1QvtfnPttfWc6sY2hsaf3cJb';
    
        const priceDetails = await stripe.prices.retrieve(stripePriceId);
        const planPrice = priceDetails.unit_amount / 100;  
      
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription", 
          line_items: [{
            price: stripePriceId,  
            quantity: 1,
          }],
          success_url: `http://localhost:5137/haspremium?number=${number}`,
          cancel_url: "http://localhost:5137/getpremium",
        });
    
       
        const { error } = await supabase
        .from("premiumdata")
        .upsert({  plan: plan.name, number}, { onConflict: ["number"] });
      
      if (error) {
        console.error("Database update failed:", error);
        // Note: Not returning an error response here.
      }
      
      console.log(`✅ User ${number} upgraded to ${plan.name} plan`);
      res.json({ checkoutUrl: session.url });
    
      }
    catch (err) {
      console.error("Error creating checkout session:", err);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  };
  

/**
 * ✅ 3. Handle Stripe Webhook (After Successful Payment)
 */
const cd=async (req, res) => {
    try {
      const { number } = req.params;
  
      // Check premium status in Supabase
      const { data, error } = await supabase
        .from("premiumdata")
        .select("plan")
        .eq("number", number)
        .single();
  
      if (error || !data) {
        return res.status(404).json({ isPremium: false, message: "No premium subscription found." });
      }
  
      res.json({ isPremium: true, plan: data.plan, message: "User has a premium subscription." });
    } catch (err) {
      console.error("Error checking premium status:", err);
      res.status(500).json({ isPremium: false, message: "Internal server error" });
    }
  };
  

module.exports = { checkPremium, createCheckoutSession,cd};
