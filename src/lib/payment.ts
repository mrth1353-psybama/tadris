// ساختار آماده برای اتصال درگاه پرداخت (مثل زرین‌پال یا آیدی‌پی) در آینده.
// در حال حاضر هیچ درگاهی متصل نیست؛ سفارش‌ها با وضعیت "awaiting_payment"
// ثبت می‌شوند و هماهنگی پرداخت به‌صورت دستی انجام می‌شود.

export interface PaymentRequest {
  orderId: string;
  amount: number;
  description: string;
  callbackUrl: string;
}

export interface PaymentRequestResult {
  success: boolean;
  paymentUrl?: string;
  authority?: string;
  error?: string;
}

export interface PaymentVerifyResult {
  success: boolean;
  refId?: string;
  error?: string;
}

export async function createPaymentRequest(
  _request: PaymentRequest,
): Promise<PaymentRequestResult> {
  return {
    success: false,
    error: "درگاه پرداخت آنلاین هنوز متصل نشده است.",
  };
}

export async function verifyPayment(
  _authority: string,
  _amount: number,
): Promise<PaymentVerifyResult> {
  return {
    success: false,
    error: "درگاه پرداخت آنلاین هنوز متصل نشده است.",
  };
}
