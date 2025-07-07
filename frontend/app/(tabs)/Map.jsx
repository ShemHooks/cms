import { useEffect, useState } from "react";
import ChildrenLocations from "../components/parent/ChildrenLocations";
import * as SecureStore from "expo-secure-store";

import ChildMapView from "./../components/children/ChildMapView";
const Map = () => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedRole = await SecureStore.getItemAsync("role");
      const storedId = await SecureStore.getItemAsync("userId");
      setUserRole(storedRole);
      setUserID(storedId);
    };
    loadUserData();
  }, []);

  return userRole === "parent" ? (
    <ChildrenLocations parentId={userId} />
  ) : (
    <ChildMapView />
  );
};

export default Map;
