module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // ปิดการเตือนเรื่อง any
    "@typescript-eslint/no-explicit-any": "off",

    // ตัวอย่าง ถ้ามี warning อื่น ๆ ก็สามารถปิดได้แบบนี้
    // "@typescript-eslint/no-unused-vars": "warn",
  }
};
