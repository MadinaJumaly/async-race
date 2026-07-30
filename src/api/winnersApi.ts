import { apiSlice } from './apiSlice';
import { WINNERS_PER_PAGE } from '../constants';
import type { Paginated, SortOrder, Winner, WinnersSortField } from '../types';

const readTotalCount = (headers: Headers): number =>
  Number(headers.get('X-Total-Count') ?? 0);

export const winnersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query <
      Paginated<Winner>,
      { page: number; sort: WinnersSortField; order: SortOrder; limit?: number }
    >({
      query: ({ page, sort, order, limit = WINNERS_PER_PAGE }) => ({
        url: '/winners',
        params: { _page: page, _limit: limit, _sort: sort, _order: order },
      }),
      transformResponse: (items: Winner[], meta) => ({
        items,
        totalCount: readTotalCount(meta?.response?.headers ?? new Headers()),
      }),
      providesTags: ['Winner'],
    }),

    getWinner: builder.query<Winner, number>({
      query: (id) => `/winners/${id}`,
    }),

    createWinner: builder.mutation<Winner, Winner>({
      query: (body) => ({ url: '/winners', method: 'POST', body }),
      invalidatesTags: ['Winner'],
    }),

    updateWinner: builder.mutation<Winner, Winner>({
      query: ({ id, ...body }) => ({ url: `/winners/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Winner'],
    }),

    deleteWinner: builder.mutation<void, number>({
      query: (id) => ({ url: `/winners/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Winner'],
    }),
  }),
});

export const {
  useGetWinnersQuery,
  useLazyGetWinnerQuery,
  useCreateWinnerMutation,
  useUpdateWinnerMutation,
  useDeleteWinnerMutation,
} = winnersApi;