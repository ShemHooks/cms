import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const QRCodeScanner = ({ visible, onScanned, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (visible) {
      setScanned(false);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && permission && !permission.granted) {
      (async () => {
        await requestPermission();
      })();
    }
    if (visible) {
      StatusBar.setHidden(true);
    }
    return () => {
      StatusBar.setHidden(false);
    };
  }, [visible, permission]);

  if (!permission || !permission.granted) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={({ data }) => {
            if (!scanned) {
              setScanned(true);
              onScanned(data);
              onClose();
            }
          }}
        />

        {/* Overlay message */}
        <View style={styles.messageOverlay}>
          <Text style={styles.messageText}>
            QR code scanner will be available in the release.
          </Text>
        </View>

        <Pressable onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  cancelButton: {
    marginBottom: 40,
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 14,
    borderRadius: 14,
  },
  cancelText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    fontSize: 16,
  },
  messageOverlay: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 10,
  },
  messageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default QRCodeScanner;
