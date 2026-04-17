import axios, { Axios } from 'axios';
import { apiBaseUrl } from '@/config';
// import { useAuthStore } from "@/stores/AuthStore";
import router from '@/router';
import { toast } from 'vue3-toastify';

const http: Axios = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // 'X-Requested-With': 'XMLHttpRequest',
  }
  // withCredentials: true
});

http.interceptors.request.use((config) => {
  // const authStore = useAuthStore();

  // if (authStore.verificationToken) {
  //   config.headers.Authorization = `Bearer ${authStore.verificationToken}`;
  // }

  // config.headers.Authorization = httpToken;
  // config.headers.token = httpMobilityToken;

  return config;
});
http.interceptors.response.use(
  (response) => {
    /**
     * Validation Errors
     */
    // store.commit('setValidationError', []);

    // const message = response?.data?.message || response?.data?.msg;
    // if (message) {
    //   makeToast("success", message);
    // }

    return response;
  },
  (error) => {
    const errorStatus = error?.response?.status;
    // const authStore = useAuthStore();

    if (errorStatus === 401) {
      // authStore.setUser(null);
      // authStore.setLoginToken(null);
      // authStore.setVerificationToken(null);
      return router.push({ name: 'auth.login' });
    } else if (errorStatus === 403) {
      return router.push({ name: 'front.index' });
    } else if (errorStatus === 422) {
      const errorsObj = error.response?.data?.errors;

      for (const key in errorsObj) {
        if (Object.prototype.hasOwnProperty.call(errorsObj, key)) {
          errorsObj[key].forEach((value: string) => {
            toast.error(`<p>${value}</p>`);
          });
        }
      }
    } else if (errorStatus === 400) {
      toast.error(error?.response.message || 'حدث خطأ!');
    } else {
      toast.error(`<p>حدث خطأ غير متوقع!</p>`);
    }

    return Promise.reject(error);
  }
);

export type IHttp = typeof http;

export default http;
