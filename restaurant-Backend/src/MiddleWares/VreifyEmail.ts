import { v4 as uuidv4 } from 'uuid';

interface VerificationCode {
    code: number;
    expiresAt: Date;
}

const verificationStore: Map<string, VerificationCode[]> = new Map();

// Generate 6 unique random numbers
const generateRandomNumbers = (count: number = 6): number[] => {
    const numbers: number[] = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * 1000000); // Generating numbers between 0 and 999999
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};

// Store verification codes
const storeVerificationCodes = (email: string, codes: number[], validityMinutes: number = 10) => {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + validityMinutes);
    const codesWithExpiry = codes.map(code => ({ code, expiresAt: expirationTime }));
    verificationStore.set(email, codesWithExpiry);
};

// Verify the user input
const verifyCode = (email: string, code: number): boolean => {
    const storedCodes = verificationStore.get(email) || [];
    const now = new Date();
    const validCode = storedCodes.find(c => c.code === code && c.expiresAt > now);
    return Boolean(validCode);
};

// Clear expired codes (could be run periodically)
const clearExpiredCodes = () => {
    const now = new Date();
    verificationStore.forEach((codes, email) => {
        const validCodes = codes.filter(c => c.expiresAt > now);
        if (validCodes.length > 0) {
            verificationStore.set(email, validCodes);
        } else {
            verificationStore.delete(email);
        }
    });
};

export { generateRandomNumbers, storeVerificationCodes, verifyCode, clearExpiredCodes };
