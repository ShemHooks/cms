import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import ChildrenDashboard from "../components/children/ChildrenDashboard";
import ParentDashboard from "../components/parent/ParentDashboard";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const storedName = await SecureStore.getItemAsync("name");
      const storedRole = await SecureStore.getItemAsync("role");
      const userIds = await SecureStore.getItemAsync("userId");
      console.log("stored name", storedName);
      setName(storedName);
      setRole(storedRole);
      setUserId(userIds);
    };
    loadUserData();
  }, []);

  return role === "parent" ? (
    <ParentDashboard name={name} userId={userId} />
  ) : (
    <ChildrenDashboard name={name} userId={userId} />
  );
}
