import { apiSlice } from './apiSlice';
import type { EngineResponse } from '../types';

export const engineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleEngine: builder.mutation<
      EngineResponse,
      { id: number; status: 'started' | 'stopped' }
    >({
      query: ({ id, status }) => ({
        url: '/engine',
        method: 'PATCH',
        params: { id, status },
      }),
    }),

    drive: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: '/engine',
        method: 'PATCH',
        params: { id, status: 'drive' },
      }),
    }),
  }),
});

export const { useToggleEngineMutation, useDriveMutation } = engineApi;
