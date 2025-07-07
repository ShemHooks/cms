import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import getApiClient from "../axios";

export default async function RegisterApi(
  userName,
  email,
  password,
  c_password,
  device_id,
  userRole
) {
  try {
    const ip = getApiClient();
    const response = await ip.post("register", {
      name: userName,
      email,
      password,
      c_password,
      device_id,
      role: userRole,
    });

    if (response.status !== 200) {
      console.log("cannot make request");
    }

    router.replace("/(tabs)/Home");
    const { token, name, role, id } = response.data.data;

    console.log("api id", name);

    await SecureStore.setItemAsync("userId", id.toString());
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("name", userName);
    await SecureStore.setItemAsync("role", role);
  } catch (error) {
    if (error.response) {
      console.log("Server responded with:", error.response.data);
    } else {
      console.error("Error creating post:", error.message);
    }
  }
}
