"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearExpiredCodes = exports.verifyCode = exports.storeVerificationCodes = exports.generateRandomNumbers = void 0;
var verificationStore = new Map();
// Generate 6 unique random numbers
var generateRandomNumbers = function (count) {
    if (count === void 0) { count = 6; }
    var numbers = [];
    while (numbers.length < count) {
        var num = Math.floor(Math.random() * 1000000); // Generating numbers between 0 and 999999
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};
exports.generateRandomNumbers = generateRandomNumbers;
// Store verification codes
var storeVerificationCodes = function (email, codes, validityMinutes) {
    if (validityMinutes === void 0) { validityMinutes = 10; }
    var expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + validityMinutes);
    var codesWithExpiry = codes.map(function (code) { return ({ code: code, expiresAt: expirationTime }); });
    verificationStore.set(email, codesWithExpiry);
};
exports.storeVerificationCodes = storeVerificationCodes;
// Verify the user input
var verifyCode = function (email, code) {
    var storedCodes = verificationStore.get(email) || [];
    var now = new Date();
    var validCode = storedCodes.find(function (c) { return c.code === code && c.expiresAt > now; });
    return Boolean(validCode);
};
exports.verifyCode = verifyCode;
// Clear expired codes (could be run periodically)
var clearExpiredCodes = function () {
    var now = new Date();
    verificationStore.forEach(function (codes, email) {
        var validCodes = codes.filter(function (c) { return c.expiresAt > now; });
        if (validCodes.length > 0) {
            verificationStore.set(email, validCodes);
        }
        else {
            verificationStore.delete(email);
        }
    });
};
exports.clearExpiredCodes = clearExpiredCodes;
