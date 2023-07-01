import Cookies from "js-cookie";

const cookie = Cookies.get("authUserData");

export const checkToken = () => {
  if (cookie) {
    const data = JSON.parse(cookie);
    if (data instanceof Object && data?.access_token) {
      return data;
    }
  }

  return null;
};



/* ---------------------- expire time check and invalid --------------------- */
class CookieExpireInCheck {
  autoLogoutTimeOut(callback) {
    const data = checkToken();
    if (data && data instanceof Object) {
      const expiresInTime = data?.expires_in;
      const remainingTime = (new Date().getTime() + 500) - new Date().getTime();
   
     return setTimeout(callback, remainingTime);
    }
  }

  clearTimeOut(callback) {
    clearTimeout(callback);
  }
}



export const CookieExpireTimeOut = new CookieExpireInCheck()