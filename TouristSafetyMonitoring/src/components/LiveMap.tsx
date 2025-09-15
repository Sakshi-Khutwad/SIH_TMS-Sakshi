import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker, UrlTile, Polygon } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export default function App() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Example zone coordinates (4 corners)
  const zoneCoords = [
    { latitude: 27.09194, longitude: 93.60487 },
    { latitude: 27.09194, longitude: 93.61487 },
    { latitude: 27.08194, longitude: 93.61487 },
    { latitude: 27.08194, longitude: 93.60487 },
  ];


  // Ask permission for Android
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      // Watch position for real-time updates
      const watchId = Geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.log("Location error:", error),
        { enableHighAccuracy: true, distanceFilter: 5 }
      );

      return () => Geolocation.clearWatch(watchId);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        {...(location
          ? {
            region: {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            },
          }
          : {
            // Default region around the zone
            region: {
              latitude: 27.0869,     // Center latitude of Itanagar
              longitude: 93.6099,    // Center longitude of Itanagar
              latitudeDelta: 0.05,   // Zoom level (adjust smaller for more zoomed-in)
              longitudeDelta: 0.05,
            }

          })}
      >
        {/* street view map: https://tile.openstreetmap.de/{z}/{x}/{y}.png */}
        {/* https://cartodb-basemaps-a.dark.allthemaps.net/{z}/{x}/{y}{r}.png */}
        {/* OSM tiles */}
        <UrlTile
          urlTemplate="https://cartodb-basemaps-a.dark.allthemaps.net/{z}/{x}/{y}{r}.png"
          maximumZ={19}
        />

        {/* Marker for current location */}
        {location && <Marker coordinate={location} title="You are here" />}

        {/* Polygon for custom zone */}
        <Polygon
          coordinates={zoneCoords}
          strokeColor="rgba(8, 179, 8, 0.9)"   // border color (green)
          fillColor="rgba(26, 157, 26, 0.3)"    // fill color (transparent green)
          strokeWidth={2}
        />
      </MapView>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
