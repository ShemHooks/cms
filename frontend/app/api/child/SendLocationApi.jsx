import getApiClient from "../axios";

const SendLocationApi = async (user_id, latitude, longitude) => {
  //   console.log("latitude", latitude);
  //   console.log("longitude", longitude);
  //   console.log("user id", user_id);

  try {
    const ip = getApiClient();
    const response = await ip.post("/addLocation", {
      user_id,
      latitude,
      longitude,
    });
    if (response.status !== 200) {
      console.log("error sending location");
    }
  } catch (err) {
    console.error(err);
    console.log(err);
  }
};

export default SendLocationApi;
