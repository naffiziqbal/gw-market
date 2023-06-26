import Cookies from "js-cookie";

const G_CLIENT_ID = import.meta.env.VITE_G_CLIENT_ID;
const BASE_URL = import.meta.env.VITE_BASE_CLIENT_URL;
const G_CLIENT_SECRET = import.meta.env.VITE_G_CLIENT_SECRET;
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;


export const oAuth2Login = (path) => {
  const authorizationEndpoint = "https://accounts.google.com/o/oauth2/auth";
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  const responseType = "code";
  const accessType = "offline";
  const redirectUri = path ? `${BASE_URL}${path}` : BASE_URL;

  // Redirect user to Google OAuth 2.0 authorization endpoint
  window.location.href = `${authorizationEndpoint}?client_id=${G_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
};

// set oAuth2 code and state in storage

export const oAuthUrlToData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    localStorage.setItem("oAuth2Code", JSON.stringify({ code }));
  }

  return { code };
};

// exchangeCodeForTokens

export const exchangeCodeAndStore = async (authorizationCode, path) => {
  const tokenEndpoint = "https://oauth2.googleapis.com/token";
  const redirectUri = path ? `${BASE_URL}${path}` : BASE_URL;
  const grantType = "authorization_code";

  try {
    const response = await fetch(tokenEndpoint, {
      method: "post",
      body: JSON.stringify({
        code: authorizationCode,
        client_id: G_CLIENT_ID,
        client_secret: G_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: grantType,
      }),
    });

    const data = await response.json();
    if (!data?.error) {
      localStorage.setItem("oAuth2Data", JSON.stringify(data));
    }
  } catch (error) {
    console.error("Token Error:", error);
  }
};

// convert token

export const convertToken = async (getData) => {
  try {
    if (getData) {
      const token = getData?.access_token;

      const DATA = {
        grant_type: "convert_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        token: token,
        backend: "google-oauth2",
      };

      const response = await fetch(`${API_BASE_URL}/auth/convert-token`, {
        method: "post",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify(DATA),
      });

      // user info from google
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const userData = await userInfo.json();

      if (!data?.error) {
        Cookies.set(
          "authUserData",
          JSON.stringify({ ...data, user: userData }),
          { expires: data?.expires_in }
        );
        return { data: data, user: userData };
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// set query param  in localstorage for tracking  route after google login success

export const setQuery = (query) => {
  if (query) {
    localStorage.setItem("query", query);
  }
};

export const getQuery = () => {
  let query = localStorage.getItem("query");
  if (query) return query;
};

export const deleteQuery = () => {
  localStorage.removeItem("query");
};
