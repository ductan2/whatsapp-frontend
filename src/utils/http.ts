import axios, { AxiosInstance } from "axios";

class Http {
   instance: AxiosInstance;
   constructor() {
      this.instance = axios.create({
         baseURL: import.meta.env.VITE_URL_ENDPOINT_API,
         withCredentials: true,
         timeout: 10000
      })
   }
}
const http = new Http().instance
export default http;