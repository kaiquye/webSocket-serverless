import axios from 'axios';

export interface IDefaultBackEndResponse {
  data: object;
  error: boolean;
}

export const GitHubBaseApi = axios.create({
  baseURL: 'https://api.github.com/users/kaiquye',
});

GitHubBaseApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
  },
);
