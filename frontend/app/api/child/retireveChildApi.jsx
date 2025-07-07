import getApiClient from "../axios";

const retrieveChildApi = async (parentId) => {
  try {
    const ip = getApiClient();
    const response = await ip.get(`/retrieveChildren/${parentId}`);

    // console.log("Stored userId:", parentId);

    // console.log("response", response.data);

    if (response.status === 200 && response.data.data) {
      return {
        children: response.data,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default retrieveChildApi;
