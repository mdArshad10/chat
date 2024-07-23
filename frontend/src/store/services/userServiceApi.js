import { basicApi } from "../apiService.js";
import {
  allUser,
  signup,
  login,
  addProfileImage,
  logout,
  removeProfileImage,
  updateProfile,
  userInfo,
} from "@/constant.js";

export const userApi = basicApi.injectEndpoints({
  endpoints: (build) => ({
    allUser: build.query({
      query: () => ({
        url: `/${allUser}`,
        method: "GET",
      }),
    }),
    signup: build.mutation({
      query: (data) => ({
        url: `/${signup}`,
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: `/${login}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useAllUserQuery } = userApi;
