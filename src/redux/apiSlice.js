import { createApi } from '@reduxjs/toolkit/query/react'; // Fix import
import { axiosBaseQuery } from '../apis/axiosBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getScheduleList: builder.query({
      query: (data) => ({
        url: '/schedule',
        method: 'GET',
        params: {
          practice_id: '1700230c-394b-4a8a-8aa5-55c03f849ef7',
          date: data.date,
        },
      }),
    }),
  }),
});

// Export the generated hook
export const { useGetScheduleListQuery } = apiSlice;
