export const isTokenExpired = (token: string): boolean => {
    try {
        const [, payloadBase64] = token.split(".");
        const padded = payloadBase64.padEnd(payloadBase64.length + (4 - (payloadBase64.length % 4)) % 4, "=");
        const payload = JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    } catch (error) {
        return true; // If token is invalid or malformed
    }
};
