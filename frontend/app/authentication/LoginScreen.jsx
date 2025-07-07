import { Link } from "expo-router";
import { useState } from "react";
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
import LoginApi from "../api/authentication/LoginApi";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoggingIn(true);
    const logIn = await LoginApi(email, password);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("error in login", logIn.error);

    if (logIn.error) {
      setError("Login failed. Please check your credentials.");
      setIsLoggingIn(false);
    }
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
            key="login-view"
          >
            <View className="bg-white pt-10 w-[75%]  items-center shadow-black shadow-2xl rounded-lg gap-6">
              <Text className="font-bold" style={styles.textTitle}>
                LOGIN
              </Text>

              <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                className="border border-gray-500 w-[80%] px-3 py-2"
              />

              <TextInput
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                className="border border-gray-500 w-[80%] px-3 py-2"
              />
              {error ? <Text className="text-red-700 ">{error}</Text> : null}
              <View className="w-[80%]">
                {isLoggingIn ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <Button title="Login" onPress={handleSubmit} />
                )}
              </View>

              <View>
                <Text>
                  New to App?
                  <Link href="./SelectRole">
                    <Text className="text-blue-500"> Register</Text>
                  </Link>
                </Text>
              </View>
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
