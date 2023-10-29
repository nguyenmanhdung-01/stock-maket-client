export default function generateCaptcha() {
  let uniquechar = "";
  const captcha =
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
  for (let i = 0; i < 7; i++) {
    uniquechar += captcha.charAt(Math.random() * captcha.length);
  }
  return uniquechar;
}
