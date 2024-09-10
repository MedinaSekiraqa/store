// api.ts
import axios, { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_API_URL || "http://localhost:3001/api"

// const { data: session } = useSession();
// const userId = session?.user?.email;
export const createAxiosInstance = (config?: AxiosRequestConfig) => {

   const axiosInstance = axios.create({
      baseURL: BASE_URL,
      ...config,
   });
   return axiosInstance;
};

export const axiosPublic = createAxiosInstance();

export const usePrivateAxios = () => {
   const { data: session } = useSession();
   const userId = session?.user?.email;
   // console.log(userId)
   const axiosInstance = createAxiosInstance({
      withCredentials: true,
   });

   // Add an interceptor to modify the request before it's sent
   axiosInstance.interceptors.request.use((requestConfig) => {
      if (userId) {
         // Add userId to the request payload (data property)
         requestConfig.data = {
            ...requestConfig.data,
            userId: userId,
         };
      }
      return requestConfig;
   });

   return axiosInstance;
};
