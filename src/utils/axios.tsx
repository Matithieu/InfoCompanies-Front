import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const jwtToken = Cookies.get("user-jwt");
    // Utiliser le token JWT si disponible
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    //config.withCredentials = true;
    //console.log("config ", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refresh-token");

      // Remplacer par l'URL de votre endpoint de rafraîchissement de token
      const refreshResponse = await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/refresh-token`, {
        "refresh-token": refreshToken,
      });

      if (refreshResponse.status === 200) {
        const newToken = refreshResponse.data.token;
        Cookies.set("user-jwt", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
