import Razorpay from "razorpay";

const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;

let razorpayInstance = null;

if (RAZORPAY_KEY_ID && RAZORPAY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET,
  });
} else {
  console.warn(
    "⚠️ Razorpay keys are not configured. Payment functionality will be unavailable until backend/.env is updated."
  );
}

export default razorpayInstance;