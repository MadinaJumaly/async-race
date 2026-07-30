import { apiSlice } from './apiSlice';
import { CARS_PER_PAGE } from '../constants';
import type { Car, CarDraft, Paginated } from '../types';

const readTotalCount = (headers: Headers): number =>
  Number(headers.get('X-Total-Count') ?? 0);

export const garageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<Paginated<Car>, { page: number; limit?: number }>({
      query: ({ page, limit = CARS_PER_PAGE }) => ({
        url: '/garage',
        params: { _page: page, _limit: limit },
      }),
      transformResponse: (items: Car[], meta) => ({
        items,
        totalCount: readTotalCount(meta?.response?.headers ?? new Headers()),
      }),
      providesTags: ['Car'],
    }),

    createCar: builder.mutation<Car, CarDraft>({
      query: (body) => ({ url: '/garage', method: 'POST', body }),
      invalidatesTags: ['Car'],
    }),

    updateCar: builder.mutation<Car, { id: number; body: CarDraft }>({
      query: ({ id, body }) => ({ url: `/garage/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Car'],
    }),

    deleteCar: builder.mutation<void, number>({
      query: (id) => ({ url: `/garage/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Car', 'Winner'],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = garageApi;
