import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectRole() {
  const navigation = useNavigation();

  const handleRoleSelect = (selectedRole) => {
    navigation.navigate("authentication/RegistrationScreen", {
      role: selectedRole,
    });
  };

  return (
    <SafeAreaView className="items-center justify-center w-full h-full bg-stone-200">
      <View className="bg-white w-[80%] h-[50%] items-center pt-20 shadow-black shadow-2xl rounded-2xl">
        <Text className="text-3xl font-bold">Select Your Role</Text>
        <View className="flex flex-row gap-12 mt-8 ">
          <Pressable
            className="mt-10 bg-red-500 w-[70px] h-[40px] items-center justify-center"
            onPress={() => handleRoleSelect("parent")}
          >
            <Text className="text-lg text-white">Parent</Text>
          </Pressable>

          <Pressable
            className="mt-10 bg-red-500 w-[70px] h-[40px] items-center justify-center"
            onPress={() => handleRoleSelect("child")}
          >
            <Text className="text-lg text-white">Child</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
