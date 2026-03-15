/**
 * Payment service – Razorpay checkout and backend order/verify.
 * Flow: createOrder(plan) → open Razorpay → on success → paymentSuccess() → backend generates API key.
 */

import { request } from "./apiService";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export const PLANS = {
  free: "Free",
  pro: "Pro",
  enterprise: "Enterprise",
};

/** Plan key → amount in paise (₹499 = 49900, ₹1999 = 199900) */
export const PLAN_AMOUNTS = {
  free: 0,
  pro: 49900,
  enterprise: 199900,
};

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Razorpay runs only in browser"));
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

/**
 * Create Razorpay order via backend.
 * @param {string} plan - "free" | "pro" | "enterprise"
 * @returns {Promise<{ amount: number, razorpay_order_id: string, currency: string }>}
 */
export async function createOrder(plan) {
  return request("/create-order", {
    method: "POST",
    body: { plan },
  });
}

/**
 * Verify payment and let backend generate API key.
 * @param {object} data - { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan }
 */
export async function verifyPayment(data) {
  return request("/payment-success", {
    method: "POST",
    body: data,
  });
}

/**
 * Full buy flow: create order → open Razorpay checkout → on success call payment-success → optional callback (e.g. redirect).
 * @param {string} plan - "free" | "pro" | "enterprise"
 * @param {string} userEmail - prefilled in checkout
 * @param {(result: object) => void} onSuccess - called after verification (e.g. navigate to dashboard)
 */
export async function buyPlan(plan, userEmail = "", onSuccess) {
  if (plan === "free") {
    const result = await request("/payment-success", {
      method: "POST",
      body: { plan, activate_free: true },
    });
    if (onSuccess) onSuccess(result);
    return;
  }

  await loadRazorpayScript();

  const order = await createOrder(plan);
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency || "INR",
    name: "VeriLex AI",
    description: `${PLANS[plan]} plan`,
    order_id: order.razorpay_order_id,
    prefill: { email: userEmail },
    theme: { color: "#5e6ad2" },
    handler: async (response) => {
      const result = await verifyPayment({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        plan,
      });
      if (onSuccess) onSuccess(result);
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

/** Alias for existing Pricing component that uses initiatePayment(plan, email, onSuccess). */
export async function initiatePayment(planKey, userEmail, onSuccess) {
  return buyPlan(planKey, userEmail, onSuccess);
}
