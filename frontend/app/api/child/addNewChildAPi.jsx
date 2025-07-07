import getApiClient from "./../axios";

const addNewChildAPi = async (childId, parentId) => {
  try {
    const ip = await getApiClient();
    const response = await ip.put(`/updateParentId/${childId}`, {
      parentId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to assign parent:", error);
    throw error;
  }
};

export default addNewChildAPi;
