import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import RegisterApi from "../api/authentication/RegistrationApi";

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const newUUID = uuid.v4();
    setDeviceId(newUUID);
  }, []);

  const route = useRoute();
  const { role } = route.params;

  const registerHandler = () => {
    setIsSubmit(true);
    RegisterApi(name, email, password, cpassword, deviceId, role);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView
            className="items-center justify-center w-full bg-stone-200"
            style={styles.body}
            key="registration-view"
          >
            <View className="bg-white w-[80%]  items-center pt-8 gap-6 shadow-black shadow-2xl rounded-lg">
              <Text className="font-bold" style={styles.textTitle}>
                Register
              </Text>

              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                className="border border-gray-500 w-[80%]"
              />

              <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                className="border border-gray-500 w-[80%]"
              />

              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                className="border border-gray-500 w-[80%]"
              />

              <TextInput
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={cpassword}
                onChangeText={setCpassword}
                className="border border-gray-500 w-[80%]"
              />

              <View className="w-[80%]">
                {isSubmit ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Button title="Register" onPress={registerHandler} />
                )}
              </View>

              <Text>
                Already Registered?
                <Link href="/authentication/LoginScreen">
                  <Text className="text-blue-500"> Login</Text>
                </Link>
              </Text>

              <Text></Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
  },

  textTitle: {
    fontSize: 20,
  },
});
