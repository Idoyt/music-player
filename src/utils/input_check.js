/**
 * check input style
 * @param {string} email
 * @return {boolean}
 */
export function emailCheck(email) {
  if (typeof (email)!== 'string') return false;

  if (email.length > 255 || email.length < 3) return false;

  const at = email.indexOf('@');
  if (at === -1 || email.indexOf('@', at+1) !== -1) return false;

  const point = email.indexOf('.');
  if (point === -1 || email.indexOf('.', point+1) !== -1) return false;

  if (point < at) return false;
  if (email.substring(point+1, point+4) !== 'com') return false;

  const allowedEmail = ['gmail', 'qq', '163'];
  if (!allowedEmail.includes(email.substring(at+1, point))) return false;

  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(email.substring(0, at));
}

/**
 * check input is phone num or not
 * @param {string} num
 * @return {boolean}
 */
export function phoneCheck(num) {
  if (typeof (num) !== 'string') return false;
  return num.length === 11;
}

/**
 * check user's input for username
 * @param {string} username
 * @return {boolean}
 */
export function userNameCheck(username) {
  if (typeof (username) !== 'string') return false;
  // first char cannot be number
  if (!isNaN(parseInt(username[0]))) return false;
  // length must less than 11
  if (username.length > 11) return false;
  // username must be English letter or number
  const letterMatchPattern = /\w+/g;
  const ans = username.match(letterMatchPattern);
  return ans[0].length === username.length;
}

/**
 * check password security level
 * @param {string} password -1 styleError 1-3 security level,lv3 is allowed
 * @return {number}
 */
export function passwordCheck(password) {
  if (typeof (password) !== 'string') return -1;
  const upperCase = /[A-Z]/g;
  const lowerCase = /[a-z]/g;
  const numCase = /\d/g;
  let securityLevel = 0;
  if (password.match(upperCase)) securityLevel ++;
  if (password.match(lowerCase)) securityLevel ++;
  if (password.match(numCase)) securityLevel ++;
  return securityLevel;
}

