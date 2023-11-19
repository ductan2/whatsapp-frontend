import axios, { AxiosInstance } from "axios";

class Http {
   instance: AxiosInstance;
   constructor() {
      this.instance = axios.create({
         baseURL: "http://localhost:5000/api/v1",
         withCredentials: true,
         timeout: 10000
      })
   }
}
const http = new Http().instance
export default http;