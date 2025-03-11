import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ZakatScreen from '../screens/ZakatScreen';
import ZakatCalculatorScreen from '../screens/ZakatCalculatorScreen';
import ZakatMalScreen from '../screens/ZakatMalScreen';
import ZakatFitrahScreen from '../screens/ZakatFitrahScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DoaScreen from '../screens/DoaScreen';
import CreateDoaScreen from '../screens/CreateDoaScreen';
import MyDoasScreen from '../screens/MyDoasScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.lightText,
        tabBarStyle: {
          backgroundColor: Colors.light.card,
          borderTopColor: Colors.light.border,
          paddingTop: 5,
          paddingBottom: 5,
          height: 80, // Increased height
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ZakatTab"
        component={ZakatScreen}
        options={{
          tabBarLabel: "Zakat",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-holding-heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DoaTab"
        component={DoaScreen}
        options={{
          tabBarLabel: "Doa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarLabel: "Tentang",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const isAuthenticated = false; // This would normally come from your auth state

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Main" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* Main Tab Navigator */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* Zakat Screens */}
        <Stack.Screen
          name="Zakat"
          component={ZakatScreen}
          options={{ title: "Zakat" }}
        />
        <Stack.Screen
          name="ZakatCalculator"
          component={ZakatCalculatorScreen}
          options={{ title: "Kalkulator Zakat" }}
        />
        <Stack.Screen
          name="ZakatMal"
          component={ZakatMalScreen}
          options={{ title: "Zakat Mal" }}
        />
        <Stack.Screen
          name="ZakatFitrah"
          component={ZakatFitrahScreen}
          options={{ title: "Zakat Fitrah" }}
        />

        {/* Doa Screens */}
        <Stack.Screen
          name="CreateDoa"
          component={CreateDoaScreen as any}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyDoas"
          component={MyDoasScreen}
          options={{ title: "Doa Saya" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}