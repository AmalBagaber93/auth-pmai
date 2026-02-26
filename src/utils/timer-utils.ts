export const RESEND_KEY = "otp_resend_start";
export const EXPIRY_KEY = "otp_expiry_start";
export const FORGOT_PASSWORD_RESEND_KEY = "forgot_password_otp_resend_start";
export const FORGOT_PASSWORD_EXPIRY_KEY = "forgot_password_otp_expiry_start";
export const RESEND_DURATION = 60;
export const EXPIRY_DURATION = 600;


export const getRemaining = (key: string, duration: number) => {
    const saved = localStorage.getItem(key);
    if (!saved) return duration;

    const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
};

export const startTimers = (resendKey: string = RESEND_KEY, expiryKey: string = EXPIRY_KEY) => {
    const now = Date.now().toString();
    localStorage.setItem(resendKey, now);
    localStorage.setItem(expiryKey, now);
};

export const clearTimers = (resendKey: string = RESEND_KEY, expiryKey: string = EXPIRY_KEY) => {
    localStorage.removeItem(resendKey);
    localStorage.removeItem(expiryKey);
};

export const ensureTimersStarted = (resendKey: string = RESEND_KEY, expiryKey: string = EXPIRY_KEY) => {
    if (!localStorage.getItem(resendKey)) {
        startTimers(resendKey, expiryKey);
    }
};
