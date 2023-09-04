import CustomAxiosInstance from '@utils/axios';

export const API_ENDPOINT = 'http://localhost:8080/api';

export const apiInstance = new CustomAxiosInstance(API_ENDPOINT);

export default apiInstance;
