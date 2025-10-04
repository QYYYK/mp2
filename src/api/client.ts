// src/api/client.ts
import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api.server.nbaapi.com/api',
  timeout: 10000,
});

// 标记是否使用mock数据
export const useMockData = true;

http.interceptors.response.use(
  (r: any) => r,
  async (err: any) => {
    if (useMockData) {
      // 如果配置使用mock数据，则不重试，直接返回错误以便使用mock数据
      return Promise.reject(err);
    }
    
    const cfg: any = err.config || {};
    if (!cfg._retried) {
      cfg._retried = true;
      try {
        return await axios(cfg);
      } catch (retryErr) {
        return Promise.reject(retryErr);
      }
    }
    return Promise.reject(err);
  }
);

export default http;
