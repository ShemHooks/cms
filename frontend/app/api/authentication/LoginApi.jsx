import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import getApiClient from "../axios";

export default async function LoginApi(email, password) {
  console.log(email);
  try {
    const ip = getApiClient();
    const response = await ip.post("login", {
      email,
      password,
    });

    if (response.status !== 200) {
      return { error: true };
    }

    console.log(response.data.data);
    const { token, name, role, id } = response.data.data;

    await SecureStore.setItemAsync("userId", id.toString());
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("name", name);
    await SecureStore.setItemAsync("role", role);

    router.replace("/(tabs)/Home");
  } catch (error) {
    if (error.response) {
      console.error("Server responded with:", error.response.data);
      return { error };
    } else {
      console.error("Error creating post:", error.message);
      return { error };
    }
  }
}
