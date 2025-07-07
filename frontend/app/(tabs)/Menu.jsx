import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const logout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("name");
          router.replace("/authentication/LoginScreen");
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View className="p-6 mt-6 bg-white border shadow-xl">
        <Pressable onPress={logout}>
          <Text className="font-bold">LOGOUT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
