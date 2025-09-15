// Working
// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker, UrlTile } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// export default function App() {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   // Ask permission for Android
//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   useEffect(() => {
//     (async () => {
//       const hasPermission = await requestPermission();
//       if (!hasPermission) return;

//       // Watch position for real-time updates
//       const watchId = Geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => console.log("Location error:", error),
//         { enableHighAccuracy: true, distanceFilter: 5 }
//       );

//       return () => Geolocation.clearWatch(watchId);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         showsUserLocation={true}
//         {...(location
//           ? {
//               region: {
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               },
//             }
//           : {})}
//       >
//         {/* OSM tiles */}
//         <UrlTile
//           urlTemplate="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//           maximumZ={19}
//         />

//         {/* Marker for current location */}
//         {location && <Marker coordinate={location} title="You are here" />}
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });


// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker, UrlTile, Polygon } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// export default function App() {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   // Example zone coordinates (4 corners)
//   const zoneCoords = [
//     { latitude: 28.6139, longitude: 77.2090 },
//     { latitude: 28.6239, longitude: 77.2090 },
//     { latitude: 28.6239, longitude: 77.2190 },
//     { latitude: 28.6139, longitude: 77.2190 },
//   ];

//   // Ask permission for Android
//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   useEffect(() => {
//     (async () => {
//       const hasPermission = await requestPermission();
//       if (!hasPermission) return;

//       // Watch position for real-time updates
//       const watchId = Geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => console.log("Location error:", error),
//         { enableHighAccuracy: true, distanceFilter: 5 }
//       );

//       return () => Geolocation.clearWatch(watchId);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         showsUserLocation={true}
//         {...(location
//           ? {
//               region: {
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 latitudeDelta: 0.02,
//                 longitudeDelta: 0.02,
//               },
//             }
//           : {
//               // Default region around the zone
//               region: {
//                 latitude: 28.6189,
//                 longitude: 77.2140,
//                 latitudeDelta: 0.05,
//                 longitudeDelta: 0.05,
//               },
//             })}
//       >
//         {/* OSM tiles */}
//         <UrlTile
//           urlTemplate="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
//           maximumZ={19}
//         />

//         {/* Marker for current location */}
//         {location && <Marker coordinate={location} title="You are here" />}

//         {/* Polygon for custom zone */}
//         <Polygon
//           coordinates={zoneCoords}
//           strokeColor="rgba(255,0,0,0.9)"   // border color (red)
//           fillColor="rgba(255,0,0,0.3)"    // fill color (transparent red)
//           strokeWidth={2}
//         />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker, UrlTile, Polygon } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// export default function App() {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   // Example zone coordinates (4 corners)
//   const zoneCoords = [
//     { latitude: 27.09194, longitude: 93.60487 },
//     { latitude: 27.09194, longitude: 93.61487 },
//     { latitude: 27.08194, longitude: 93.61487 },
//     { latitude: 27.08194, longitude: 93.60487 },
//   ];


//   // Ask permission for Android
//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   useEffect(() => {
//     (async () => {
//       const hasPermission = await requestPermission();
//       if (!hasPermission) return;

//       // Watch position for real-time updates
//       const watchId = Geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => console.log("Location error:", error),
//         { enableHighAccuracy: true, distanceFilter: 5 }
//       );

//       return () => Geolocation.clearWatch(watchId);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         showsUserLocation={true}
//         {...(location
//           ? {
//             region: {
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             },
//           }
//           : {
//             // Default region around the zone
//             region: {
//               latitude: 27.0869,     // Center latitude of Itanagar
//               longitude: 93.6099,    // Center longitude of Itanagar
//               latitudeDelta: 0.05,   // Zoom level (adjust smaller for more zoomed-in)
//               longitudeDelta: 0.05,
//             }

//           })}
//       >
//         {/* street view map: https://tile.openstreetmap.de/{z}/{x}/{y}.png */}
//         {/* https://cartodb-basemaps-a.dark.allthemaps.net/{z}/{x}/{y}{r}.png */}
//         {/* OSM tiles */}
//         <UrlTile
//           urlTemplate="https://cartodb-basemaps-a.dark.allthemaps.net/{z}/{x}/{y}{r}.png"
//           maximumZ={19}
//         />

//         {/* Marker for current location */}
//         {location && <Marker coordinate={location} title="You are here" />}

//         {/* Polygon for custom zone */}
//         <Polygon
//           coordinates={zoneCoords}
//           strokeColor="rgba(232, 45, 45, 0.3)"   // border color (green)
//           fillColor="rgba(248, 8, 8, 0.3)"    // fill color (transparent green)
//           strokeWidth={2}
//         />
//       </MapView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Text,
  Alert,
  Button,
  AppState,
  AppStateStatus,
  Vibration
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Sound from 'react-native-sound';

// Define types for our state
interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface RedZone {
  id: number;
  latitude: number;
  longitude: number;
  radius: number;
  name: string;
}

// Enable audio playback
Sound.setCategory('Playback');

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [initialLocation, setInitialLocation] = useState<Location | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [inRedZone, setInRedZone] = useState<boolean>(false);
  const [currentZone, setCurrentZone] = useState<RedZone | null>(null);
  const appState = useRef<AppStateStatus>('active');
  const alertSound = useRef<Sound | null>(null);
  const hasTriggeredAlert = useRef(false);

  // Red zones based on initial location
  const [redZones, setRedZones] = useState<RedZone[]>([]);

  // Load alert sound
  useEffect(() => {
    alertSound.current = new Sound('alert.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) {
        console.log('Failed to load sound', error);
      } else {
        console.log('Sound loaded successfully');
      }
    });

    return () => {
      if (alertSound.current) {
        alertSound.current.release();
      }
    };
  }, []);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        checkRedZones();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  // Calculate distance between two coordinates in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Check if current location is in any red zone
  const checkRedZones = () => {
    if (!location) return;

    for (const zone of redZones) {
      const distance = calculateDistance(
        location.latitude, 
        location.longitude,
        zone.latitude,
        zone.longitude
      );

      console.log(`Distance to zone ${zone.name}: ${distance.toFixed(2)} meters`);

      if (distance <= zone.radius) {
        if (!inRedZone || currentZone?.id !== zone.id) {
          setInRedZone(true);
          setCurrentZone(zone);
          triggerRedZoneAlert(zone);
        }
        return;
      }
    }

    // If we were in a red zone but now left it
    if (inRedZone) {
      setInRedZone(false);
      setCurrentZone(null);
      hasTriggeredAlert.current = false;
    }
  };

  // Trigger alert when entering red zone
  const triggerRedZoneAlert = (zone: RedZone) => {
    if (hasTriggeredAlert.current) return;
    
    hasTriggeredAlert.current = true;

    Alert.alert(
      "🚨 RED ZONE ALERT 🚨",
      `You have entered ${zone.name}! \nDistance: ${calculateDistance(
        location!.latitude, location!.longitude, zone.latitude, zone.longitude
      ).toFixed(2)} meters`,
      [{ text: "OK", onPress: () => console.log("Alert closed") }],
      { cancelable: false }
    );

    Vibration.vibrate([0, 1000, 500, 1000, 500, 1000]);

    if (alertSound.current) {
      alertSound.current.play((success: boolean) => {
        if (!success) {
          console.log('Sound playback failed');
        }
        setTimeout(() => Vibration.cancel(), 3000);
      });
    } else {
      setTimeout(() => Vibration.cancel(), 3000);
    }
  };

  // Ask permission for Android
  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location to monitor red zones.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          setHasLocationPermission(true);
          return true;
        } else {
          console.log("Location permission denied");
          setLocationError("Location permission denied");
          return false;
        }
      }
      
      setHasLocationPermission(true);
      return true;
    } catch (err) {
      console.warn("Error requesting location permission:", err);
      setLocationError("Error requesting location permission");
      return false;
    }
  };

  // Create red zones based on initial location
  const createRedZones = (latitude: number, longitude: number) => {
    // Create zones with larger offsets and radius for better visibility
    const newRedZones: RedZone[] = [
      { 
        id: 1, 
        latitude: latitude + 0.001,  // ~110 meters
        longitude: longitude + 0.001, 
        radius: 50,  // 50 meter radius
        name: "Restricted Area 1" 
      },
      { 
        id: 2, 
        latitude: latitude - 0.001,  // ~110 meters
        longitude: longitude - 0.0005, 
        radius: 60,  // 60 meter radius
        name: "Restricted Area 2" 
      },
      { 
        id: 3, 
        latitude: latitude + 0.0005,  // ~55 meters
        longitude: longitude - 0.001, 
        radius: 70,  // 70 meter radius
        name: "Restricted Area 3" 
      },
    ];
    
    setRedZones(newRedZones);
    console.log("Red zones created around initial location:", newRedZones);
  };

  const getLocation = () => {
    setIsLoading(true);
    setLocationError(null);
    hasTriggeredAlert.current = false;
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Initial position:", latitude, longitude);
        
        // Store initial location and create red zones only once
        if (!initialLocation) {
          setInitialLocation({ latitude, longitude, timestamp: Date.now() });
          createRedZones(latitude, longitude);
        }
        
        setLocation({ latitude, longitude, timestamp: Date.now() });
        setLocationError(null);
        setIsLoading(false);
        
        // Check if already in a red zone
        setTimeout(() => checkRedZones(), 1000);
      },
      (error) => {
        console.log("❌ Location error:", error.code, error.message);
        setLocationError(`Location error: ${error.message}`);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    const initLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setIsLoading(false);
          return;
        }

        getLocation();

        // Watch for position updates
        const watchId = Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude, timestamp: Date.now() });
            setLocationError(null);
            
            // Check for red zones after update
            setTimeout(() => checkRedZones(), 100);
          },
          (error) => {
            console.log("❌ Location watch error:", error.code, error.message);
            setLocationError(`Location update error: ${error.message}`);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 0.5, // Update every 0.5 meters
            interval: 3000,
            fastestInterval: 1000,
            timeout: 30000,
            maximumAge: 0
          }
        );

        return () => Geolocation.clearWatch(watchId);
      } catch (error) {
        console.log("Error initializing location:", error);
        setLocationError("Error initializing location service");
        setIsLoading(false);
      }
    };

    initLocation();
  }, []);

  // Check red zones whenever location changes
  useEffect(() => {
    if (location) {
      checkRedZones();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {/* Status Display */}
      <View style={[styles.statusBar, inRedZone ? styles.redZoneStatus : styles.safeZoneStatus]}>
        <Text style={styles.statusText}>
          {inRedZone 
            ? `🚨 IN RED ZONE: ${currentZone?.name}` 
            : "✅ You are in a safe area"}
        </Text>
      </View>

      {/* Coordinates Display */}
      {location && (
        <Text style={styles.locationText}>
          {`📍 Lat: ${location.latitude.toFixed(6)}, Lng: ${location.longitude.toFixed(6)}`}
        </Text>
      )}

      {/* Map */}
      <View style={styles.mapBox}>
        <MapView
          key={forceUpdate}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.02, // Wider view to see circles
                  longitudeDelta: 0.02,
                }
              : {
                  latitude: 18.5204,
                  longitude: 73.8567,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }
          }
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
          {/* Current location marker */}
          {location && (
            <Marker
              key={`marker-${location.timestamp}`}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Your location"
              pinColor={inRedZone ? "red" : "green"}
            />
          )}

          {/* Red zone circles (only show if we have initial location) */}
          {initialLocation && redZones.map((zone) => (
            <Circle
              key={zone.id}
              center={{ latitude: zone.latitude, longitude: zone.longitude }}
              radius={zone.radius}
              strokeColor="rgba(255, 0, 0, 0.8)"
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeWidth={2}
            />
          ))}
        </MapView>
      </View>

      {/* Debug Info */}
      <View style={styles.debugPanel}>
        <Text style={styles.debugText}>
          Red Zones: {redZones.length} | Status: {inRedZone ? 'ALERT' : 'SAFE'}
        </Text>
        {initialLocation && (
          <Text style={styles.debugText}>
            Initial Location: {initialLocation.latitude.toFixed(6)}, {initialLocation.longitude.toFixed(6)}
          </Text>
        )}
        {redZones.length > 0 && (
          <Text style={styles.debugText}>
            Zone 1: {redZones[0].latitude.toFixed(6)}, {redZones[0].longitude.toFixed(6)} (Radius: {redZones[0].radius}m)
          </Text>
        )}
        <Button title="Refresh Location" onPress={getLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  redZoneStatus: {
    backgroundColor: '#ffcccc',
  },
  safeZoneStatus: {
    backgroundColor: '#ccffcc',
  },
  statusText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  locationText: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  mapBox: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  debugPanel: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  debugText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
});



