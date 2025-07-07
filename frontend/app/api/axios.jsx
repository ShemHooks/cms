import axios from "axios";
import Constants from "expo-constants";

const getHostUri = () => {
  return (
    Constants.expoConfig?.hostUri ||
    Constants.expoConfig?.extra?.expoClient?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri
  );
};

const getApiClient = () => {
  const hostUri = getHostUri();

  if (!hostUri) {
    throw new Error("Could not determine host IP. Make sure Expo is running.");
  }

  const ip = hostUri.split(":")[0];
  const baseURL = `http://${ip}:8000/api`; // Customize port and path here

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export default getApiClient;
