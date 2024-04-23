/**
 * check input style
 * @param {string} email
 * @return {boolean}
 */
export function emailCheck(email) {
  if (typeof (email)!== 'string') return false;
  if (email.length > 255 || email.length < 3) return false;

  const matchParton = /^[\w\.-]+@[\w\.-]+\.\w+/g;
  return email.match(matchParton) !== null;
}

/**
 * check input is phone num or not
 * @param {string} num
 * @return {boolean}
 */
export function phoneCheck(num) {
  if (typeof (num) !== 'string') return false;
  const matchPaton = /\d/g;
  const temp = num.match(matchPaton);
  const len = temp !== null ? temp.length : 0;
  return num.length === len;
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

