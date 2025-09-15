import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
