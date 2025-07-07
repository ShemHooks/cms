import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

import retrieveChildrenLocationApi from "../../api/child/retrieveChildrenLocationApi";

const ChildrenLocations = ({ parentId }) => {
  const [location, setLocation] = useState([]);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveLocation = async () => {
      try {
        const data = await retrieveChildrenLocationApi(parentId);
        // const userLocationData = JSON.stringify(data.data, null, 2);
        // console.log("New location data", userLocationData);
        setLocation(data.data.data);
        setLoading(false);

        if (mapRef.current && data.data.data.length > 0) {
          const coordinates = data.data.data.map((loc) => ({
            latitude: parseFloat(loc.latitude),
            longitude: parseFloat(loc.longitude),
          }));

          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveLocation();

    const interval = setInterval(() => {
      retrieveLocation();
    }, 60000);
    return () => clearInterval(interval);
  }, [parentId]);

  console.log("location data", location);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading && (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }} // NOT className
          showsUserLocation={false}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: 9.9650628,
            longitude: 122.8339441,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {Array.isArray(location) &&
            location.map((loc) => (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: parseFloat(loc.latitude),
                  longitude: parseFloat(loc.longitude),
                }}
                title={loc.user?.name || "Child"}
                description={`Recorded at ${loc.recorded_at}`}
              />
            ))}
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default ChildrenLocations;
