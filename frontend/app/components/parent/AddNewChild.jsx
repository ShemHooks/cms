import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import addNewChildAPi from "../../api/child/addNewChildAPi";
import QRCodeScanner from "./QRCodeScanner";

const AddNewChild = ({ open, parentId }) => {
  const [childId, setChildId] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleSubmit = async () => {
    if (!childId.trim()) return;
    try {
      await addNewChildAPi(childId.trim(), parentId);
      setChildId("");
    } catch (err) {
      console.error("Failed to add child:", err);
    }
  };

  if (!open) return null;

  // console.log("scanned id", childId);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Insert Child ID"
            onChangeText={setChildId}
            value={childId}
            style={styles.textInput}
          />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <FontAwesome name="arrow-right" size={20} color="black" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => setShowScanner(true)}
          style={styles.scanButton}
        >
          <Text style={styles.scanButtonText}>Scan QR Code Instead</Text>
        </Pressable>
      </KeyboardAvoidingView>

      {/* Scanner Modal */}
      <QRCodeScanner
        visible={showScanner}
        onScanned={(data) => {
          console.log("Scanned data received:", data);
          setChildId(data);
          setShowScanner(false);
        }}
        onClose={() => setShowScanner(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    paddingLeft: 12,
  },
  scanButton: {
    padding: 12,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    marginBottom: 16,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AddNewChild;
