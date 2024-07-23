import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constant.js";

// Define a service using a base URL and expected endpoints
export const basicApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["user", "chat"],
  endpoints: (builder) => ({}),
});
