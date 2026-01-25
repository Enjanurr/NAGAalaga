// lib/token.ts
import * as SecureStore from "expo-secure-store";

export const setAccessToken = (token: string) =>
  SecureStore.setItemAsync("accessToken", token);

export const getAccessToken = () =>
  SecureStore.getItemAsync("accessToken");

export const setRefreshToken = (token: string) =>
  SecureStore.setItemAsync("refreshToken", token);

export const getRefreshToken = () =>
  SecureStore.getItemAsync("refreshToken");

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};
    