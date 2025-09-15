import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen.tsx';
import HomeScreen from '../screens/HomeScreen.tsx'

export type RootStackParamList = {
  Login: undefined,
  Register: undefined,
  Home: {
    name: string, 
    email: string, 
    phoneNumber: string, 
    documentType: string, 
    documentNumber: string, 
    photo: string
  },
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(){
    return (
        <Stack.Navigator initialRouteName='Home'>
            {/* <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            /> */}
            <Stack.Screen 
                name="Register"
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;