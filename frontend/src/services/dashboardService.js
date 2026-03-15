/**
 * Dashboard service – API key, plan, usage, payment history.
 * All requests go through apiService (token from localStorage).
 */

import { request } from "./apiService";

/**
 * @returns {Promise<{ api_key?: string, plan: string, usage_count: number, payment_history?: Array<{ plan: string, amount: number, status: string, razorpay_payment_id: string, created_at: string }> }>}
 */
export async function getDashboard() {
  return request("/dashboard/me", { method: "GET" });
}

/**
 * @returns {Promise<Array<{ plan: string, amount: number, status: string, razorpay_payment_id: string, created_at: string }>>}
 */
export async function getPayments() {
  const data = await request("/dashboard/payments", { method: "GET" });
  return data.payments || data || [];
}
