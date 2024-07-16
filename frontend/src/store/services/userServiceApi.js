import { basicApi } from "../apiService.js";
import {
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
    signup: build.query({
      query: (data) => `/${signup}`,
      method: "POST",
    }),
  }),
});

export const { useSignupQuery } = userApi;
