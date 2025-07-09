// src/lib/helpers/validators.js

export function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?~`]).{8,16}$/;
    return pattern.test(password);
}

export function validateString(str) {
    const trimmed = str.trim();
    return trimmed.length <= 50 && !trimmed.includes(" ");
}

export function toCamelCase(str) {
    return str
    .replace(/-./g, (m) => m[1].toUpperCase())
    .replace(/-/g, "");
}
  