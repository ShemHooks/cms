import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import SendLocationApi from "../../api/child/SendLocationApi";

const ChildrenDashboard = ({ name, userId }) => {
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (!userId) return;
    let isMounted = true;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      if (!isMounted) return;

      const { latitude, longitude } = loc.coords;
      // setLatitude(latitude);
      // setLongitude(longitude);

      SendLocationApi(userId, latitude, longitude);

      const interval = setInterval(async () => {
        try {
          let updatedLoc = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = updatedLoc.coords;

          // setLatitude(latitude);
          // setLongitude(longitude);

          SendLocationApi(userId, latitude, longitude);
        } catch (error) {
          console.error("Failed to update location:", error);
        }
      }, 10 * 60 * 1000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    })();
  }, [userId]);

  // console.log("latitude", latitude);
  // console.log("longitude", longitude);

  return (
    <LinearGradient colors={["#000000", "#004d00"]} style={styles.container}>
      <View className="gap-[50px] items-center">
        <Text className="font-bold text-center text-white">
          Hello, {name}! Your ID is {userId}
        </Text>
        {userId ? <QRCode value={userId} size={300} /> : <Text>No ID</Text>}
      </View>
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

export default ChildrenDashboard;
