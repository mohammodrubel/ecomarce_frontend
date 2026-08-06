import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { tagTypesList } from "../TagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ecomarce-backend-0dw7.onrender.com/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
