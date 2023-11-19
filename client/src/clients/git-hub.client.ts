import axios, { AxiosInstance, AxiosInterceptorManager, AxiosResponse } from "axios";

export const GitHubBaseApi = axios.create({
    baseURL: "https://api.github.com/users/kaiquye"
})

GitHubBaseApi.interceptors.response.use((response)=> {
    return response
}, (error)=> {
  console.log(error)
})