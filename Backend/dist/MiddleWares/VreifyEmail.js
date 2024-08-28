"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearExpiredCodes = exports.verifyCode = exports.storeVerificationCodes = exports.generateRandomNumbers = void 0;
const verificationStore = new Map();
// Generate 6 unique random numbers
const generateRandomNumbers = (count = 6) => {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * 1000000); // Generating numbers between 0 and 999999
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};
exports.generateRandomNumbers = generateRandomNumbers;
// Store verification codes
const storeVerificationCodes = (email, codes, validityMinutes = 10) => {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + validityMinutes);
    const codesWithExpiry = codes.map(code => ({ code, expiresAt: expirationTime }));
    verificationStore.set(email, codesWithExpiry);
};
exports.storeVerificationCodes = storeVerificationCodes;
// Verify the user input
const verifyCode = (email, code) => {
    const storedCodes = verificationStore.get(email) || [];
    const now = new Date();
    const validCode = storedCodes.find(c => c.code === code && c.expiresAt > now);
    return Boolean(validCode);
};
exports.verifyCode = verifyCode;
// Clear expired codes (could be run periodically)
const clearExpiredCodes = () => {
    const now = new Date();
    verificationStore.forEach((codes, email) => {
        const validCodes = codes.filter(c => c.expiresAt > now);
        if (validCodes.length > 0) {
            verificationStore.set(email, validCodes);
        }
        else {
            verificationStore.delete(email);
        }
    });
};
exports.clearExpiredCodes = clearExpiredCodes;
