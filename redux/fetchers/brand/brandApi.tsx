import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export const BrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewBrand: builder.mutation({
      query: (data) => ({
        url: `/brand`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `/brand/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    getAllBrand: builder.query({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
      providesTags: [tagTypes.brand],
    }),

    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brand],
    }),

    DeleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
  useAddNewBrandMutation,
  useUpdateBrandMutation, 
  useGetAllBrandQuery,
  useGetSingleBrandQuery,
  useDeleteBrandMutation
} = BrandApi;
