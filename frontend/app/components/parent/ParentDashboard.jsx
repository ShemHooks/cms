import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import retrieveChildApi from "./../../api/child/retireveChildApi";
import AddNewChild from "./AddNewChild";

const ParentDashboard = ({ name, userId }) => {
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // console.log("useEffect triggered in ParentDashboard");

    const fetchChildren = async () => {
      // console.log("Calling retrieveChildApi...");
      try {
        const data = await retrieveChildApi(userId);
        // console.log("Data received:", data.children);
        setChildren(data.children.data);
      } catch (err) {
        console.error("Error fetching children:", err);
      }
    };

    fetchChildren();

    const interval = setInterval(() => {
      fetchChildren();
    }, 60000);

    return () => clearInterval(interval);
  }, [userId]);

  const handleAddNewChildClicked = () => {
    setOpen((prev) => !prev);
  };
  // console.log("Children fetched from API:", children);
  return (
    <LinearGradient colors={["#000000", "#004d00"]} style={styles.container}>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="  h-[80px] flex-row justify-between items-center  ">
            <Text className="font-bold text-white">Hello, {name}!</Text>
          </View>
          <View className="gap-6 p-6">
            <Pressable
              className=" h-[40px] w-full bg-stone-100 justify-center border rounded-3xl pl-6 "
              onPress={handleAddNewChildClicked}
            >
              <Text className="font-bold">+ Add New Child</Text>
            </Pressable>

            <AddNewChild open={open} parentId={userId} />
            {children.map((child) => (
              <View
                key={child.id}
                className="bg-stone-100 h-[40px] w-full border pl-6 justify-center rounded-3xl "
              >
                <Text className="font-bold">{child.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});

export default ParentDashboard;
