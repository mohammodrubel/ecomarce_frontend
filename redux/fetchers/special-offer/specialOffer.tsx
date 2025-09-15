// /special-offer
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/TagTypes";

export const specialOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSpecialOffer: builder.mutation({
      query: (data) => ({
        url: `/special-offer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getSingleSpecialOffer: builder.query({
      query: () => ({
        url: `/special-offer`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetSingleSpecialOfferQuery, useAddSpecialOfferMutation } = specialOfferApi;
