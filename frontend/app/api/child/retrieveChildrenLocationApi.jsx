import getApiClient from "../axios";

const retrieveChildrenLocationApi = async (parentId) => {
  try {
    const ip = getApiClient();
    const response = await ip.get(`getAllLatestLocations/${parentId}`);

    if (response.status === 200) {
      return { data: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export default retrieveChildrenLocationApi;
