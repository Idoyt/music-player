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

