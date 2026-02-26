export const RESEND_KEY = "otp_resend_start";
export const EXPIRY_KEY = "otp_expiry_start";
export const RESEND_DURATION = 60;
export const EXPIRY_DURATION = 600;


export const getRemaining = (key: string, duration: number) => {
    const saved = localStorage.getItem(key);
    if (!saved) return duration;

    const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
    const remaining = duration - elapsed;
    return remaining > 0 ? remaining : 0;
};

export const startTimers = () => {

    const now = Date.now().toString();
    localStorage.setItem(RESEND_KEY, now);
    localStorage.setItem(EXPIRY_KEY, now);
};

export const clearTimers = () => {

    localStorage.removeItem(RESEND_KEY);
    localStorage.removeItem(EXPIRY_KEY);
};


export const ensureTimersStarted = () => {
    if (!localStorage.getItem(RESEND_KEY)) {
        startTimers();
    }
};
