import axios from 'axios';

export const axiosBaseQuery =
  ({ baseUrl }) => async ({ url, method = 'GET', data, params }) => {
    try {
      const response = await axios({
        url: baseUrl + url,
        method,            
        data,              
        params,            
      });
      return { data: response.data };
    } catch (error) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
